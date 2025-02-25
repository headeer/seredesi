import React, { useState } from "react";
import { ReactComponent as SvgBackgroundPyramid } from "../../assets/egypt/svg_background_pyramid.svg";
import { ReactComponent as Pharaoh } from "../../assets/egypt/pharaoh.svg";
import PyramidMazeGame from "./PyramidMazeGame";
import { useTranslation } from "react-i18next";

const SolvePyramidPuzzle = ({ onPuzzleSolved, setAnimationStageBg }) => {
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
      <p className="small-text">ESCAPE THE ANCIENT PYRAMID</p>
      {!gameStarted && (
        <>
          <h1>Navigate the Maze</h1>
          <p className="discover">
            Guide the pharaoh through the mysterious corridors of the ancient
            pyramid. Find the hidden treasures and escape before time runs out!
          </p>
        </>
      )}

      <div
        className={`puzzle-grid-container ${
          startGameAnimation ? "start-game" : ""
        }`}
      >
        {gameStarted ? (
          <PyramidMazeGame onGameWon={gameWin} />
        ) : (
          <>
            <SvgBackgroundPyramid className="background" />
            <h4>
              PYRAMID <span>ESCAPE</span>
            </h4>
            <h5>
              FIND THE <span>WAY OUT</span>
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

export default SolvePyramidPuzzle;
