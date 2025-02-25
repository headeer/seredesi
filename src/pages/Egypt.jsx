import React, { useState } from "react";
import SolvePyramidPuzzle from "../components/egypt/SolvePyramidPuzzle";
import SolvedPyramidPuzzle from "../components/egypt/SolvedPyramidPuzzle";
import { ReactComponent as BgPyramid } from "../assets/egypt/bg_pyramid_big.svg";

const Egypt = () => {
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
    <div className="egypt stage">
      {isPuzzleSolved ? (
        <SolvedPyramidPuzzle
          restart={restartPuzzle}
          setAnimationStageBg={(stage) => setStageNew(stage)}
        />
      ) : (
        <SolvePyramidPuzzle
          onPuzzleSolved={handlePuzzleSolved}
          setAnimationStageBg={(stage) => setStage(stage)}
        />
      )}
      {/* <div className="stopper">
        <BgPyramid
          className={`background_game_original stage-${animateSvgStage} ${
            animateSvgStageNew ? "animate" : ""
          }`}
        />
      </div> */}
    </div>
  );
};

export default Egypt;
