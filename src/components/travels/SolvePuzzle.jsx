import React, { useState } from "react";
import { ReactComponent as SvgBackgroundMadeira } from "../../assets/travels/svg_background_madeira.svg";
import { ReactComponent as Handstand } from "../../assets/travels/handstand.svg";
import PuzzleGrid from "./PuzzleGrid";
import { useTranslation } from "react-i18next";
import PuzzleGame from "./PuzzleGame";

const SolvePuzzle = ({ onPuzzleSolved, setAnimationStageBg }) => {
  const { t } = useTranslation();
  const [animationStage, setAnimationStage] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [startGameAnimation, setStartGameAnimation] = useState(false);

  const [gameWon, setGameWon] = useState(false);

  const gameWin = () => {
    setAnimationStageBg(1);
    setGameWon(true);
    setTimeout(() => {
      onPuzzleSolved();
    }, 1500);
  };
  const handleStartOrRestart = () => {
    if (gameWon) return;

    if (gameStarted) {
      setGameStarted(false);
      setGameWon(false);
    } else {
      setStartGameAnimation(true);
      setTimeout(() => {
        setStartGameAnimation(false);
        setGameStarted(true);
        setAnimationStageBg(0);
      }, 660);
    }
  };

  return (
    <div className={`solve-puzzle-container stage-${animationStage}`}>
      <p className="small-text">{t("you_will_find")}</p>
      <h1>{t("solve_the_puzzle")}</h1>
      <p className="discover">{t("discover_the_secret_of_the_goal")}</p>

      <div
        className={`puzzle-grid-container ${
          startGameAnimation ? "start-game" : ""
        }`}
      >
        {!gameStarted && (
          <>
            <SvgBackgroundMadeira className="background" />
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
