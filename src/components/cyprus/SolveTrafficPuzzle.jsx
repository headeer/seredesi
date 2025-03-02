import React, { useState } from "react";
import { ReactComponent as SvgBackgroundTraffic } from "../../assets/cyprus/water-background.svg";
import RaftRushGame from "./RaftRushGame";
import { useTranslation } from "react-i18next";

const SolveRaftRushPuzzle = ({ onPuzzleSolved, setAnimationStageBg }) => {
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
      <p className="small-text">NAVIGATE THE WILD RIVER</p>
      {!gameStarted && (
        <>
          <h1>Raft Rush Challenge</h1>
          <p className="discover">
            Guide your raft through treacherous waters! Dodge rocks, logs, and
            sharks while racing against time. Can you reach the rescue boat
            before it's too late?
          </p>
        </>
      )}

      <div
        className={`puzzle-grid-container ${
          startGameAnimation ? "start-game" : ""
        }`}
      >
        {gameStarted ? (
          <RaftRushGame onGameWon={gameWin} />
        ) : (
          <>
            <SvgBackgroundTraffic className="background" />
            <h4>
              RIVER <span>ESCAPE</span>
            </h4>
            <h5>
              REACH THE <span>RESCUE BOAT</span>
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

export default SolveRaftRushPuzzle;
