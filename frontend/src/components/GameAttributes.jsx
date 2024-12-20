import gameAttributesStyles from "../styles/componentStyles/gameAttributes.module.css"

export default function GameAttributes({getHint}) {
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
          <button onClick={() => {getHint(true)}}>Hint</button>
        </div>
        <div>
          <button>Notes</button>
        </div>
      </div>
      <div>
        {Array.from({ length: 3 }).map((_, rowIdx) => (
          <div key={rowIdx} className={gameAttributesStyles.notepadRow}>
            {Array.from({ length: 3 }).map((_, colIdx) => (
              <div key={colIdx}>{rowIdx * 3 + colIdx + 1}</div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button>New Game</button>
      </div>
    </div>
  );
}
