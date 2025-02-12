import React, { useState } from "react";
import SolvePuzzle from "../components/travels/SolvePuzzle";
import SolvedPuzzle from "../components/travels/SolvedPuzzle";
import { ReactComponent as BgMadeira } from "../assets/travels/bg_madeira_big.svg";

const Travels = () => {
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [animateSvgStage, setAnimateSvgStage] = useState(0);
  const [animateSvgStageNew, setAnimateSvgStageNew] = useState(false);
  const setStage = (stage) => {
    setAnimateSvgStage(stage);
  };
  const setStageNew = (stage) => {
    setAnimateSvgStageNew(stage);
  };
  const handlePuzzleSolved = () => {
    setIsPuzzleSolved(true);
  };
  const restartPuzzle = () => {
    setIsPuzzleSolved(false);
  };

  return (
    <div className="travels stage">
      {isPuzzleSolved ? (
        <SolvedPuzzle
          restart={restartPuzzle}
          setAnimationStageBg={(stage) => setStageNew(stage)}
        />
      ) : (
        <SolvePuzzle
          onPuzzleSolved={handlePuzzleSolved}
          setAnimationStageBg={(stage) => setStage(stage)}
        />
      )}
      <div className="stopper">
        <BgMadeira
          className={`background_game_original stage-${animateSvgStage} ${
            animateSvgStageNew ? "animate" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Travels;
