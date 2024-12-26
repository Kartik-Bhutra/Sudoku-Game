import gameComponentStyles from "../styles/componentStyles/gameComponent.module.css";
import { useContext } from "react";
import {OptionsContext}  from "../gameAssest/Options";

export default function GameComponents({mistakeCount}) {
  const [mistakes] = useContext(OptionsContext).mistake;
  return (
    <div className={gameComponentStyles.status}>
      <div className={gameComponentStyles.difficultyBar}>
        <div>Difficulty: </div>
        <div className={gameComponentStyles.levels}>
          <span>Easy</span>
          <span>Medium</span>
          <span>Hard</span>
        </div>
      </div>
      <div className={gameComponentStyles.playerStatus}>
        <div>
          <span>Mistakes:</span>
          <span>{mistakes}/</span>
          <span>3</span>
        </div>
        <div>
          <span>Score:</span>
          <span>0</span>
        </div>
        <div>
          <span>00:</span>
          <span>00</span>
          <span>click</span>
        </div>
      </div>
    </div>
  );
}