import React, { useState, useEffect } from "react";

import row1col1 from "../../assets/travels/puzzle/row-1-column-1.png";
import row1col2 from "../../assets/travels/puzzle/row-1-column-2.png";
import row1col3 from "../../assets/travels/puzzle/row-1-column-3.png";
import row2col1 from "../../assets/travels/puzzle/row-2-column-1.png";
import row2col2 from "../../assets/travels/puzzle/row-2-column-2.png";
import row2col3 from "../../assets/travels/puzzle/row-2-column-3.png";
import row3col1 from "../../assets/travels/puzzle/row-3-column-1.png";
import row3col2 from "../../assets/travels/puzzle/row-3-column-2.png";
// import { ReactComponent as BgMadeira } from "../../assets/travels/bg_madeira_big.svg";

const PuzzleGame = ({ onPuzzleSolved }) => {
  const initialTiles = [
    row1col1,
    row1col2,
    row1col3,
    row2col1,
    row2col2,
    row2col3,
    row3col1,
    row3col2,
    null,
  ];

  const [tiles, setTiles] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const easierShuffle = [...initialTiles];
    shuffleTiles(easierShuffle);
    setTiles(easierShuffle);
  }, []);

  const shuffleTiles = (tiles) => {
    for (let i = 0; i < 5; i++) {
      const emptyIndex = tiles.indexOf(null);
      const possibleMoves = [
        emptyIndex - 1,
        emptyIndex + 1,
        emptyIndex - 3,
        emptyIndex + 3,
      ].filter(
        (index) =>
          index >= 0 &&
          index < 9 &&
          !(emptyIndex % 3 === 0 && index === emptyIndex - 1) &&
          !((emptyIndex + 1) % 3 === 0 && index === emptyIndex + 1)
      );

      const randomMove =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [tiles[emptyIndex], tiles[randomMove]] = [
        tiles[randomMove],
        tiles[emptyIndex],
      ];
    }
  };

  const moveTile = (index) => {
    if (gameWon) return; // Disable moves after winning

    const emptyIndex = tiles.indexOf(null);
    const isAdjacent = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 3,
      emptyIndex + 3,
    ].includes(index);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);

      if (checkIfSolved(newTiles)) {
        setGameWon(true);
        if (onPuzzleSolved) onPuzzleSolved();
      }
    }
  };

  const checkIfSolved = (currentTiles) => {
    return currentTiles.every((tile, index) => tile === initialTiles[index]);
  };

  const isGreenBackground = (tile) => {
    return [row1col1, row3col1, row1col3, row2col2].includes(tile);
  };

  return (
    <div className="puzzle-game-container">
      {/* <BgMadeira className="background" /> */}
      <div className="puzzle-grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile ? "filled" : "empty"} ${
              gameWon ? "disabled" : ""
            } ${isGreenBackground(tile) ? "bg_green" : ""}`}
            onClick={() => moveTile(index)}
          >
            {tile && <img src={tile} alt={`puzzle-${index}`} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleGame;

// na tło delay 0.33s easing is out bouncing  + do postaci animacja na zasadzie 1 krok przesunięcie w dół a 2 krok zmiana wysokości o 1/16, o 13% i powrót do 100%
