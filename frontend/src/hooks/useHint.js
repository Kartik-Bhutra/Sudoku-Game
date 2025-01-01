export default function useHint(pos) {
    let xpos = Array(9)
        .fill()
        .map(() => Array(9).fill(0x1FF)); 
    let weight = Array(512).fill(0); 
    let stuck = true;
    function ComputeWeights() {
        for (let i = 0; i < 512; i++) {
            weight[i] = 0;
            for (let j = 256; j; j >>= 1) {
                if (i & j) weight[i]++;
            }
        }
    }
    function GetPos() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (pos[row][col] !== 0) {
                    const n = pos[row][col] - 1; 
                    const bit = 1 << n;
                    xpos[row][col] = 0; 
                    for (let i = 0; i < 9; i++) {
                        xpos[row][i] &= ~bit; 
                        xpos[i][col] &= ~bit; 
                    }
                    const blockRow = Math.floor(row / 3) * 3;
                    const blockCol = Math.floor(col / 3) * 3;
                    for (let r = blockRow; r < blockRow + 3; r++) {
                        for (let c = blockCol; c < blockCol + 3; c++) {
                            xpos[r][c] &= ~bit; 
                        }
                    }
                }
            }
        }
    }
    function CheckSingletonDigit() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (pos[row][col] === 0 && weight[xpos[row][col]] === 1) {
                    const value = Index(xpos[row][col]) + 1;
                    return [row+1,col+1,value];
                }
            }
        }
        return null;
    }
    function CheckPigeonhole() {
        const checkGroup = (cells) => {
            let digitLocations = new Map();
            for (let [row, col] of cells) {
                for (let value = 1; value <= 9; value++) {
                    const bit = 1 << (value - 1);
                    if (xpos[row][col] & bit) {
                        if (!digitLocations.has(value)) digitLocations.set(value, []);
                        digitLocations.get(value).push([row, col]);
                    }
                }
            }
            for (let [value, locations] of digitLocations) {
                if (locations.length === 1) {
                    const [row, col] = locations[0];
                    return [row+1,col+1,value];
                }
            }
            return null;
        };
        for (let i = 0; i < 9; i++) {
            let rowCells = Array.from({ length: 9 }, (_, col) => [i, col]);
            let colCells = Array.from({ length: 9 }, (_, row) => [row, i]);
            let blockCells = [];
            let blockRow = Math.floor(i / 3) * 3;
            let blockCol = (i % 3) * 3;
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    blockCells.push([blockRow + r, blockCol + c]);
                }
            }
            let hint = checkGroup(rowCells) || checkGroup(colCells) || checkGroup(blockCells);
            if (hint) return hint;
        }
        return null;
    }
    function CheckChainStrategies() {
        const findChains = () => {
            let chains = [];
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (pos[row][col] === 0 && weight[xpos[row][col]] === 2) {
                        chains.push({ row, col, values: [...ExtractBits(xpos[row][col])] });
                    }
                }
            }
            return chains;
        };
        const simplifyChains = (chains) => {
            for (let chain of chains) {
                const { row, col, values } = chain;
                const [v1, v2] = values;
                const influences = GetInfluences(row, col);
                const bit1 = 1 << (v1 - 1);
                const bit2 = 1 << (v2 - 1);
                for (let [r, c] of influences) {
                    if (xpos[r][c] & bit1 && xpos[r][c] & bit2) {
                        xpos[r][c] &= ~(bit1 | bit2);
                        const hint = `Chain Strategy: Simplified cell (${r + 1}, ${c + 1}) by removing ${v1} and ${v2}`;
                        console.log(hint);
                        return hint;
                    }
                }
            }
            return null;
        };
        let chains = findChains();
        return simplifyChains(chains);
    }
    function CheckBucketStrategy() {
        for (let block = 0; block < 9; block++) {
            const blockRow = Math.floor(block / 3) * 3;
            const blockCol = (block % 3) * 3;
            let digitsInBucket = Array(10).fill(0);
            let cells = [];
            for (let r = blockRow; r < blockRow + 3; r++) {
                for (let c = blockCol; c < blockCol + 3; c++) {
                    if (pos[r][c] === 0) {
                        cells.push([r, c]);
                        for (let value = 1; value <= 9; value++) {
                            if (xpos[r][c] & (1 << (value - 1))) {
                                digitsInBucket[value]++;
                            }
                        }
                    }
                }
            }
            for (let value = 1; value <= 9; value++) {
                if (digitsInBucket[value] === 1) {
                    for (let [r, c] of cells) {
                        if (xpos[r][c] & (1 << (value - 1))) {
                            return [r+1,c+1,value];
                        }
                    }
                }
            }
        }
        return null;
    }
    function ExtractBits(bitmask) {
        let bits = [];
        for (let i = 0; i < 9; i++) {
            if (bitmask & (1 << i)) bits.push(i + 1);
        }
        return bits;
    }
    function GetInfluences(row, col) {
        let influences = [];
        for (let i = 0; i < 9; i++) {
            if (i !== col) influences.push([row, i]);
            if (i !== row) influences.push([i, col]);
        }
        const blockRow = Math.floor(row / 3) * 3;
        const blockCol = Math.floor(col / 3) * 3;
        for (let r = blockRow; r < blockRow + 3; r++) {
            for (let c = blockCol; c < blockCol + 3; c++) {
                if (r !== row || c !== col) influences.push([r, c]);
            }
        }
        return influences;
    }
    function ProvideHint() {
        let hint = CheckSingletonDigit();
        if (hint) return hint;
        hint = CheckPigeonhole();
        if (hint) return hint;
        hint = CheckBucketStrategy();
        if (hint) return hint;
        // hint = CheckChainStrategies();
        // if (hint) return hint;
        return null;
    }
    function Index(bit) {
        let index = 0;
        while (!(bit & 1)) {
            bit >>= 1;
            index++;
        }
        return index;
    }
    ComputeWeights();
    GetPos();
    return ProvideHint();
}
