import React, { useState, useEffect } from "react";
import PyramidMazeGame from "./PyramidMazeGame";
import AnimatedPyramidBackground from "./AnimatedPyramidBackground";
import { initViewportHeight } from "../../utils/viewportHeight";

const Egypt = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Initialize viewport height handling
    const cleanup = initViewportHeight();
    return cleanup;
  }, []);

  const handleStartGame = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setGameStarted(true);
      setIsTransitioning(false);
    }, 1000);
  };

  const handleGameWon = () => {
    // Handle game completion
  };

  return (
    <div className={`egypt ${isTransitioning ? "transitioning" : ""}`}>
      {!gameStarted ? (
        <div className="pyramid-intro">
          <AnimatedPyramidBackground />
          <div className="intro-content">
            <h1>Escape the Pyramid</h1>
            <p>
              Navigate through ancient chambers, avoid mummies, and collect
              sacred ankhs to survive.
            </p>
            <button
              className="start-button"
              onClick={() => setGameStarted(true)}
            >
              Enter the Pyramid
            </button>
          </div>
        </div>
      ) : (
        <PyramidMazeGame onGameWon={handleGameWon} />
      )}
    </div>
  );
};

export default Egypt;
