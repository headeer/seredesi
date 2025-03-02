import React, { useState } from "react";
import { ReactComponent as SvgBackgroundCyprus } from "../../assets/cyprus/svg_background_cyprus.svg";
import { ReactComponent as Diver } from "../../assets/cyprus/diver.svg";
import CyprusMazeGame from "./CyprusMazeGame";
import { useTranslation } from "react-i18next";

const SolveCyprusPuzzle = ({ onPuzzleSolved, setAnimationStageBg }) => {
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
      <p className="small-text">EXPLORE THE MEDITERRANEAN DEPTHS</p>
      {!gameStarted && (
        <>
          <h1>Navigate the Waters</h1>
          <p className="discover">
            Guide the diver through the mysterious underwater ruins of ancient
            Paphos. Find hidden amphoras and escape before your oxygen runs out!
          </p>
        </>
      )}

      <div
        className={`puzzle-grid-container ${
          startGameAnimation ? "start-game" : ""
        }`}
      >
        {gameStarted ? (
          <CyprusMazeGame onGameWon={gameWin} />
        ) : (
          <>
            <SvgBackgroundCyprus className="background" />
            <h4>
              UNDERWATER <span>ESCAPE</span>
            </h4>
            <h5>
              FIND THE <span>WAY UP</span>
            </h5>
          </>
        )}
      </div>

      <div className="button-and-content">
        <button
          className="start-game-button"
          onClick={handleStartOrRestart}
          disabled={gameWon}
        >
          {gameStarted ? "RESTART GAME" : "START GAME"}
        </button>
      </div>
    </div>
  );
};

export default SolveCyprusPuzzle;
