import gameAttributesStyles from "../styles/componentStyles/gameAttributes.module.css";
import { useContext } from "react";
import { OptionsContext } from "../gameAssest/Options";
import useHint from "../hooks/useHint";

export default function GameAttributes() {
  const {
    hint:[,setHints],
    unsolved: [grid],
    value: [values, setValues],
    remaining: [remaining],
  } = useContext(OptionsContext);

  return (
    <div>
      <div className={gameAttributesStyles.functions}>
        <div>
          <button>Undo</button>
        </div>
        <div>
          <button>Erase</button>
        </div>
        <div>
          <button
            onClick={() => {
              const hint = useHint(grid);
              if(hint){
                setHints(hint);
                console.log(hint);
              }
              else{
                console.log("No hint available");
              }
            }}
          >
            Hint
          </button>
        </div>
        <div>
          <button>Notes</button>
        </div>
      </div>
      <div className={gameAttributesStyles.notepad}>
        {Array.from({ length: 3 }).map((_, rowIdx) => (
          <div key={rowIdx} className={gameAttributesStyles.notepadRow}>
            {Array.from({ length: 3 }).map((_, colIdx) => {
              const boxNo = rowIdx * 3 + colIdx + 1;
              return (
                <div key={colIdx} className={gameAttributesStyles.notepadCell}>
                  <div
                    className={gameAttributesStyles.remaining}
                    style={{
                      background: remaining[boxNo] ? "#325aaf" : "#adb6c2",
                    }}
                  >
                    {remaining[boxNo]}
                  </div>
                  <button
                    className={gameAttributesStyles.cellValue}
                    onClick={() => {
                      setValues((prevState) =>
                        prevState ? (prevState === boxNo ? 0 : boxNo) : boxNo
                      );
                    }}
                    onBlur={() => {
                      setValues(0);
                    }}
                    style={{
                      backgroundColor: values === boxNo ? "#dce3ed" : "#eaeef4",
                    }}
                  >
                    {boxNo}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div>
        <button>New Game</button>
      </div>
    </div>
  );
}
