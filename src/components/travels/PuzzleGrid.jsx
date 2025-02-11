import React from "react";
import { ReactComponent as PuzzleGreen } from "../../assets/travels/puzzle_green.svg";
import { ReactComponent as PuzzleBlack } from "../../assets/travels/puzzle_black.svg";

const PuzzleGrid = () => {
  const puzzleComponents = [
    PuzzleGreen,
    PuzzleBlack,
    PuzzleGreen,
    PuzzleBlack,
    PuzzleGreen,
    PuzzleBlack,
    PuzzleGreen,
    PuzzleBlack,
    PuzzleBlack,
  ];

  return (
    <div
      className="puzzle-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 99px)",
        gridTemplateRows: "repeat(3, 99px)",
        gap: "11px",
      }}
    >
      {puzzleComponents.map((PuzzleComponent, index) => (
        <div
          key={index}
          style={{
            width: "99px",
            height: "99px",
            borderRadius: "22px",
            border: "1px solid black",
          }}
        >
          <PuzzleComponent />
        </div>
      ))}
    </div>
  );
};

export default PuzzleGrid;
