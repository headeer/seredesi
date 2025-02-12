import React, { useState } from "react";
import SolvePuzzle from "../components/travels/SolvePuzzle";
import SolvedPuzzle from "../components/travels/SolvedPuzzle";

const Travels = () => {
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  //   const [animateSvgStage, setAnimateSvgStage] = useState(0);
  const setStage = (stage) => {
    // setAnimateSvgStage(stage);
  };
  const handlePuzzleSolved = () => {
    setIsPuzzleSolved(true);
  };
  const restartPuzzle = () => {
    setIsPuzzleSolved(false);
  };

  return (
    <div className="travels">
      {isPuzzleSolved ? (
        <SolvedPuzzle
          restart={restartPuzzle}
          setAnimationStageBg={(stage) => setStage(stage)}
        />
      ) : (
        <SolvePuzzle
          onPuzzleSolved={handlePuzzleSolved}
          setAnimationStageBg={(stage) => setStage(stage)}
        />
      )}
    </div>
  );
};

export default Travels;
