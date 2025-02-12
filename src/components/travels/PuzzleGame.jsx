import React, { useState, useEffect } from "react";
import { ReactComponent as Row1col1 } from "../../assets/travels/puzzle/row-1-column-1.svg";
import { ReactComponent as Row1col2 } from "../../assets/travels/puzzle/row-1-column-2.svg";
import { ReactComponent as Row1col3 } from "../../assets/travels/puzzle/row-1-column-3.svg";
import { ReactComponent as Row2col1 } from "../../assets/travels/puzzle/row-2-column-1.svg";
import { ReactComponent as Row2col2 } from "../../assets/travels/puzzle/row-2-column-2.svg";
import { ReactComponent as Row2col3 } from "../../assets/travels/puzzle/row-2-column-3.svg";
import { ReactComponent as Row3col1 } from "../../assets/travels/puzzle/row-3-column-1.svg";
import { ReactComponent as Row3col2 } from "../../assets/travels/puzzle/row-3-column-2.svg";
import { ReactComponent as BgMadeira } from "../../assets/travels/bg_madeira_big.svg";

const PuzzleGame = ({ onPuzzleSolved }) => {
  const initialTiles = [
    <Row1col1 key="1" />,
    <Row2col1 key="2" />,
    <Row3col1 key="3" />,
    <Row1col2 key="4" />,
    <Row2col2 key="5" />,
    <Row3col2 key="6" />,
    <Row1col3 key="7" />,
    <Row2col3 key="8" />,
    null, // Empty slot has no key
  ];

  const [tiles, setTiles] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const easierShuffle = [...initialTiles];
    shuffleMoreTiles(easierShuffle);
    setTiles(easierShuffle);
  }, []);

  const shuffleMoreTiles = (tiles) => {
    // Shuffle involving more tiles from the last two rows
    const shuffleIndices = [7, 8]; // Indices of the second and third row tiles
    shuffleIndices.forEach((index, i) => {
      const j = i + Math.floor(Math.random() * (shuffleIndices.length - i));
      [tiles[index], tiles[shuffleIndices[j]]] = [
        tiles[shuffleIndices[j]],
        tiles[index],
      ];
    });
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
      console.log(checkIfSolved(newTiles));
      if (checkIfSolved(newTiles)) {
        setGameWon(true);
        if (onPuzzleSolved) onPuzzleSolved();
      }
    }
  };

  const checkIfSolved = (currentTiles) => {
    const targetOrder = ["1", "2", "3", "4", "5", "6", "7", "8", null];
    return currentTiles.every((tile, index) => {
      return tile
        ? tile.key === targetOrder[index]
        : tile === targetOrder[index];
    });
  };

  const isGreenBackground = (tile) => {
    return tile
      ? [Row1col1, Row3col1, Row1col3, Row2col2].includes(tile.type)
      : false;
  };

  return (
    <div
      className={`puzzle-game-container ${gameWon ? "stage-finish" : ""}`}
      style={{ position: "relative" }}
    >
      <BgMadeira className="background_game" />
      <div className="puzzle-grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile ? "filled" : "empty"} ${
              gameWon ? "disabled" : ""
            } ${isGreenBackground(tile) ? "bg_green" : ""}`}
            onClick={() => moveTile(index)}
          >
            {tile}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleGame;
