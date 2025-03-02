import React, { useState } from "react";
import SolveTrafficPuzzle from "../components/cyprus/SolveTrafficPuzzle";
import SolvedTrafficPuzzle from "../components/cyprus/SolvedTrafficPuzzle";

const Cyprus = () => {
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
    <div className="cyprus stage">
      {isPuzzleSolved ? (
        <SolvedTrafficPuzzle
          restart={restartPuzzle}
          setAnimationStageBg={(stage) => setStageNew(stage)}
        />
      ) : (
        <SolveTrafficPuzzle
          onPuzzleSolved={handlePuzzleSolved}
          setAnimationStageBg={(stage) => setStage(stage)}
        />
      )}
    </div>
  );
};

export default Cyprus;
