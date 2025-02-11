import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as SvgBackgroundMadeira } from "../../assets/travels/svg_background_madeira.svg";
import { ReactComponent as ArrowIcon } from "../../assets/arrow_icon.svg";
import { ReactComponent as Handstand } from "../../assets/travels/handstand.svg";
import PuzzleGrid from "./PuzzleGrid";
import { useTranslation } from "react-i18next";
import PuzzleGame from "./PuzzleGame";

const SolvePuzzle = ({ onPuzzleSolved }) => {
  const { t } = useTranslation();
  const [animationStage, setAnimationStage] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const backgroundRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (backgroundRef.current) {
      const path = backgroundRef.current.querySelector("path");
      if (path) {
        const totalLength = path.getTotalLength();
        setPathLength(totalLength);
      }
    }
  }, []);
  const gameWin = () => {
    setGameWon(true);
    setTimeout(() => {
      onPuzzleSolved();
    }, 2000);
  };
  const handleStartOrRestart = () => {
    if (gameWon) return; // Prevent starting if game is won

    if (gameStarted) {
      setGameStarted(false);
      setGameWon(false);
      setAnimationStage(0);
    } else {
      setAnimationStage(1);
      setTimeout(() => setAnimationStage(2), 330);
      setTimeout(() => setAnimationStage(3), 660);
      setTimeout(() => {
        setGameStarted(true);
      }, 1000);
    }
  };

  return (
    <div className={`solve-puzzle-container stage-${animationStage}`}>
      <p className="small-text">{t("you_will_find")}</p>
      <h1>{t("solve_the_puzzle")}</h1>
      <p className="discover">{t("discover_the_secret_of_the_goal")}</p>

      <div className="puzzle-grid-container">
        {!gameStarted && (
          <>
            <SvgBackgroundMadeira ref={backgroundRef} className="background" />
            <Handstand className="handstand" />
            <PuzzleGrid />
            <h4>
              {t("madeira")} <br />
              <span>{t("island")}</span>
            </h4>
            <h5>
              {t("discover")}
              <br />
              <span>{t("the_secret")}</span>
            </h5>
          </>
        )}

        {gameStarted && <PuzzleGame onPuzzleSolved={() => gameWin()} />}
      </div>

      <button className="start-game-button" onClick={handleStartOrRestart}>
        {gameWon
          ? t("well_done")
          : gameStarted
          ? t("restart_game")
          : t("start_game")}
      </button>
    </div>
  );
};

export default SolvePuzzle;
