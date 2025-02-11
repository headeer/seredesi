import React, { useState } from "react";
import SolvePuzzle from "../components/travels/SolvePuzzle";
import SolvedPuzzle from "../components/travels/SolvedPuzzle";

const Travels = () => {
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);

  const handlePuzzleSolved = () => {
    setIsPuzzleSolved(true);
  };

  return (
    <div className="travels">
      {isPuzzleSolved ? (
        <SolvedPuzzle />
      ) : (
        <SolvePuzzle onPuzzleSolved={handlePuzzleSolved} />
      )}
    </div>
  );
};

export default Travels;
