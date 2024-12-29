import gameComponentStyles from "../styles/componentStyles/gameComponent.module.css";
import { useContext, useEffect, useState, useRef } from "react";
import { OptionsContext } from "../gameAssest/Options";
import { StopWatch } from "../hooks/useTimer";

export default function GameComponents() {
  const [timer, setTimer] = useState("00:00");
  const timerInstance = useRef();
  const [mistakes] = useContext(OptionsContext).mistake;

  useEffect(() => {
    timerInstance.current = new StopWatch(setTimer);
    return () => {
      timerInstance.current.stop();
    };
  }, []);

  const timerButtonHandler = () => {
    timerInstance.current.timerId ? timerInstance.current.stop() : timerInstance.current.start();
  }

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
          <span>{timer}</span>
          <button
            onClick={timerButtonHandler}
          >
            click
          </button>
        </div>
      </div>
    </div>
  );
}
