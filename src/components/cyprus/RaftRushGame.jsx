import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as SharkIcon } from "../../assets/cyprus/shark-svgrepo-com.svg";
import { ReactComponent as LogIcon } from "../../assets/cyprus/log-svgrepo-com.svg";
import { ReactComponent as RockIcon } from "../../assets/cyprus/rock-svgrepo-com.svg";
import { ReactComponent as BoatIcon } from "../../assets/cyprus/boat-svgrepo-com.svg";

const GAME_DURATION = 30; // seconds
const LANES = [0, 1, 2];
const OBSTACLE_TYPES = ["shark", "log", "rock"];
const PLAYER_HITBOX = {
  width: 40,
  height: 40,
};
const FALLING_SPEED = 3; // pixels per frame
const SPAWN_INTERVAL = 1500;

const RaftRushGame = ({ onGameWon }) => {
  const [currentLane, setCurrentLane] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const gameLoopRef = useRef(null);
  const lastSpawnTime = useRef(Date.now());
  const touchStartX = useRef(null);
  const containerRef = useRef(null);
  const playerPosition = useRef(0);

  // Calculate container height and player position on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight;
        setContainerHeight(height);
        playerPosition.current = height * 0.85; // 85% from top
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const checkCollision = (obstacle) => {
    const playerY = playerPosition.current;
    const obstacleY = obstacle.position;

    // Only check collisions when obstacle is near player
    if (obstacleY < playerY - 50) return false;

    const playerTop = playerY - PLAYER_HITBOX.height / 2;
    const playerBottom = playerY + PLAYER_HITBOX.height / 2;
    const obstacleTop = obstacleY;
    const obstacleBottom = obstacleY + PLAYER_HITBOX.height;

    return (
      obstacle.lane === currentLane &&
      obstacleBottom >= playerTop &&
      obstacleTop <= playerBottom
    );
  };

  // Handle lane changes with improved animation handling
  const moveTo = (lane) => {
    if (!isPlaying || gameOver || lane === currentLane || lane < 0 || lane > 2)
      return;
    setCurrentLane(lane);
  };

  // Handle touch events
  const handleTouchStart = (e) => {
    if (!isPlaying || gameOver) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isPlaying || gameOver || touchStartX.current === null) return;
    e.preventDefault();

    const touchEndX = e.touches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (Math.abs(deltaX) >= 50) {
      if (deltaX > 0 && currentLane > 0) {
        moveTo(currentLane - 1);
      } else if (deltaX < 0 && currentLane < 2) {
        moveTo(currentLane + 1);
      }
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying || gameOver) return;

      switch (e.key) {
        case "ArrowLeft":
          moveTo(currentLane - 1);
          break;
        case "ArrowRight":
          moveTo(currentLane + 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, gameOver, currentLane]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver || !containerHeight) return;

    const gameLoop = () => {
      const now = Date.now();

      // Spawn new obstacles
      if (now - lastSpawnTime.current > SPAWN_INTERVAL) {
        lastSpawnTime.current = now;
        setObstacles((prev) => {
          const newObstacle = {
            id: now,
            type: OBSTACLE_TYPES[
              Math.floor(Math.random() * OBSTACLE_TYPES.length)
            ],
            lane: Math.floor(Math.random() * 3),
            position: -50, // Start above the visible area
          };
          return [...prev, newObstacle];
        });
      }

      // Update obstacle positions and check collisions
      setObstacles((prev) => {
        const updated = prev
          .map((obstacle) => ({
            ...obstacle,
            position: obstacle.position + FALLING_SPEED,
          }))
          .filter((obstacle) => obstacle.position < containerHeight + 50); // Remove when fully off screen

        const collision = updated.some(checkCollision);

        if (collision) {
          setGameOver(true);
          return updated;
        }

        return updated;
      });

      // Update timer
      setTimeLeft((prev) => {
        const newTime = prev - 0.016; // ~60fps
        if (newTime <= 0) {
          onGameWon();
          setGameOver(true);
          return 0;
        }
        return newTime;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, currentLane, containerHeight, onGameWon]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setTimeLeft(GAME_DURATION);
    setCurrentLane(1);
    setObstacles([]);
    lastSpawnTime.current = Date.now();
  };

  const renderObstacleIcon = (type) => {
    switch (type) {
      case "shark":
        return <SharkIcon className="obstacle-icon shark" />;
      case "log":
        return <LogIcon className="obstacle-icon log" />;
      case "rock":
        return <RockIcon className="obstacle-icon rock" />;
      default:
        return null;
    }
  };

  return (
    <div className="raft-rush-game" ref={containerRef}>
      <div className="game-header">
        <div className="timer">Time: {Math.ceil(timeLeft)}s</div>
      </div>

      <div className="game-area">
        <div className="water-animation" />
        <div
          className="lanes-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {LANES.map((lane) => (
            <motion.div
              key={lane}
              className={`lane ${currentLane === lane ? "active" : ""}`}
              onClick={() => moveTo(lane)}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              {currentLane === lane && (
                <motion.div
                  className="player"
                  initial={{
                    x: currentLane === 0 ? -100 : currentLane === 2 ? 100 : 0,
                  }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <BoatIcon className="boat-icon" />
                </motion.div>
              )}

              <AnimatePresence>
                {obstacles
                  .filter((obstacle) => obstacle.lane === lane)
                  .map((obstacle) => (
                    <motion.div
                      key={obstacle.id}
                      className={`obstacle ${obstacle.type}`}
                      initial={{ y: -50 }}
                      animate={{ y: obstacle.position }}
                      exit={{ y: containerHeight + 50 }}
                      transition={{ duration: 0.016, ease: "linear" }}
                    >
                      {renderObstacleIcon(obstacle.type)}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {!isPlaying && !gameOver && (
          <div className="start-screen">
            <h2>Raft Rush</h2>
            <p>Survive for 30 seconds!</p>
            <button onClick={startGame}>Start Game</button>
          </div>
        )}

        {gameOver && (
          <div className="game-over">
            <h2>{timeLeft <= 0 ? "You Won!" : "Game Over"}</h2>
            <button onClick={startGame}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaftRushGame;
