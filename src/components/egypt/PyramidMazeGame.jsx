import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as PharaohIcon } from "../../assets/egypt/pharaoh.svg";
import { ReactComponent as TreasureIcon } from "../../assets/egypt/treasure_icon.svg";
import { ReactComponent as WallIcon } from "../../assets/egypt/wall_icon.svg";

const PyramidMazeGame = ({ onGameWon }) => {
  const GRID_SIZE = 10;
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [treasurePosition] = useState({ x: GRID_SIZE - 1, y: GRID_SIZE - 1 });
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [torches, setTorches] = useState([]);
  const [scarabs, setScarabs] = useState([]);
  const [mummies, setMummies] = useState([]);
  const [ankhs, setAnkhs] = useState([]);
  const [isInvincible, setIsInvincible] = useState(false);
  const [visibleRadius, setVisibleRadius] = useState(2);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [collectedScarabs, setCollectedScarabs] = useState(0);
  const [collectedAnkhs, setCollectedAnkhs] = useState(0);
  const [gameMessage, setGameMessage] = useState("");
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const mazeLayout = [
    [0, 0, 1, 1, 0, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  ];

  useEffect(() => {
    const newTorches = [];
    for (let i = 0; i < 3; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
      } while (
        mazeLayout[y][x] === 1 ||
        (x === playerPosition.x && y === playerPosition.y) ||
        (x === treasurePosition.x && y === treasurePosition.y)
      );
      newTorches.push({ x, y });
    }
    setTorches(newTorches);

    const newScarabs = [];
    for (let i = 0; i < 5; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
      } while (
        mazeLayout[y][x] === 1 ||
        (x === playerPosition.x && y === playerPosition.y) ||
        (x === treasurePosition.x && y === treasurePosition.y) ||
        newTorches.some((torch) => torch.x === x && torch.y === y)
      );
      newScarabs.push({ x, y });
    }
    setScarabs(newScarabs);

    const newAnkhs = [];
    for (let i = 0; i < 2; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
      } while (
        mazeLayout[y][x] === 1 ||
        (x === playerPosition.x && y === playerPosition.y) ||
        (x === treasurePosition.x && y === treasurePosition.y) ||
        newTorches.some((torch) => torch.x === x && torch.y === y) ||
        newScarabs.some((scarab) => scarab.x === x && scarab.y === y)
      );
      newAnkhs.push({ x, y });
    }
    setAnkhs(newAnkhs);

    const newMummies = [];
    for (let i = 0; i < level; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
      } while (
        mazeLayout[y][x] === 1 ||
        (x === playerPosition.x && y === playerPosition.y) ||
        (x === treasurePosition.x && y === treasurePosition.y) ||
        newTorches.some((torch) => torch.x === x && torch.y === y) ||
        newScarabs.some((scarab) => scarab.x === x && scarab.y === y) ||
        newAnkhs.some((ankh) => ankh.x === x && ankh.y === y)
      );
      newMummies.push({ x, y, direction: Math.floor(Math.random() * 4) });
    }
    setMummies(newMummies);
  }, [level]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Add back mummy movement
  useEffect(() => {
    const mummyInterval = setInterval(() => {
      setMummies((prevMummies) => {
        return prevMummies.map((mummy) => {
          // Calculate direction towards player
          const dx = playerPosition.x - mummy.x;
          const dy = playerPosition.y - mummy.y;

          // Try to move towards player first
          const possibleMoves = [];

          // Add horizontal move if it brings us closer to player
          if (dx !== 0) {
            const newX = mummy.x + Math.sign(dx);
            if (newX >= 0 && newX < GRID_SIZE && !mazeLayout[mummy.y][newX]) {
              possibleMoves.push({ x: newX, y: mummy.y });
            }
          }

          // Add vertical move if it brings us closer to player
          if (dy !== 0) {
            const newY = mummy.y + Math.sign(dy);
            if (newY >= 0 && newY < GRID_SIZE && !mazeLayout[newY][mummy.x]) {
              possibleMoves.push({ x: mummy.x, y: newY });
            }
          }

          // If we can't move towards player, try random directions
          if (possibleMoves.length === 0) {
            const directions = [
              { dx: 0, dy: -1 },
              { dx: 0, dy: 1 },
              { dx: -1, dy: 0 },
              { dx: 1, dy: 0 },
            ];

            directions.forEach(({ dx, dy }) => {
              const newX = mummy.x + dx;
              const newY = mummy.y + dy;
              if (
                newX >= 0 &&
                newX < GRID_SIZE &&
                newY >= 0 &&
                newY < GRID_SIZE &&
                !mazeLayout[newY][newX]
              ) {
                possibleMoves.push({ x: newX, y: newY });
              }
            });
          }

          // Make a move if possible
          if (possibleMoves.length > 0) {
            const move =
              possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            return { ...mummy, ...move };
          }

          return mummy;
        });
      });
    }, 800); // Slightly faster movement

    return () => clearInterval(mummyInterval);
  }, [playerPosition, mazeLayout, GRID_SIZE]);

  useEffect(() => {
    if (isInvincible) {
      const timer = setTimeout(() => {
        setIsInvincible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInvincible]);

  const handleGameOver = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setTimeLeft(90);
    setMoves(0);
    setScore(0);
    setCollectedScarabs(0);
    setCollectedAnkhs(0);
    setVisibleRadius(2);
    setLevel(1);
    setGameMessage("");
  };

  const isVisible = (x, y) => {
    const distance = Math.sqrt(
      Math.pow(x - playerPosition.x, 2) + Math.pow(y - playerPosition.y, 2)
    );
    return distance <= visibleRadius;
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (Math.abs(distanceX) < minSwipeDistance) return;

      const newPosition = { ...playerPosition };
      let moved = false;

      if (distanceX > 0) {
        // Swipe left
        if (
          newPosition.x > 0 &&
          !mazeLayout[newPosition.y][newPosition.x - 1]
        ) {
          newPosition.x -= 1;
          moved = true;
        }
      } else {
        // Swipe right
        if (
          newPosition.x < GRID_SIZE - 1 &&
          !mazeLayout[newPosition.y][newPosition.x + 1]
        ) {
          newPosition.x += 1;
          moved = true;
        }
      }

      if (moved) handleMove(newPosition);
    } else {
      if (Math.abs(distanceY) < minSwipeDistance) return;

      const newPosition = { ...playerPosition };
      let moved = false;

      if (distanceY > 0) {
        // Swipe up
        if (
          newPosition.y > 0 &&
          !mazeLayout[newPosition.y - 1][newPosition.x]
        ) {
          newPosition.y -= 1;
          moved = true;
        }
      } else {
        // Swipe down
        if (
          newPosition.y < GRID_SIZE - 1 &&
          !mazeLayout[newPosition.y + 1][newPosition.x]
        ) {
          newPosition.y += 1;
          moved = true;
        }
      }

      if (moved) handleMove(newPosition);
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, playerPosition, mazeLayout]);

  // Extract move logic to reusable function
  const handleMove = (newPosition) => {
    setPlayerPosition(newPosition);
    setMoves((prev) => prev + 1);

    const torchIndex = torches.findIndex(
      (t) => t.x === newPosition.x && t.y === newPosition.y
    );
    if (torchIndex !== -1) {
      setTorches((prev) => prev.filter((_, i) => i !== torchIndex));
      setVisibleRadius((prev) => Math.min(prev + 1, 4));
      setScore((prev) => prev + 50);
      setGameMessage("TORCH COLLECTED!");
    }

    const scarabIndex = scarabs.findIndex(
      (s) => s.x === newPosition.x && s.y === newPosition.y
    );
    if (scarabIndex !== -1) {
      setScarabs((prev) => prev.filter((_, i) => i !== scarabIndex));
      setCollectedScarabs((prev) => prev + 1);
      setScore((prev) => prev + 100);
      setGameMessage("TROPHY COLLECTED!");
    }

    const ankhIndex = ankhs.findIndex(
      (a) => a.x === newPosition.x && a.y === newPosition.y
    );
    if (ankhIndex !== -1) {
      setAnkhs((prev) => prev.filter((_, i) => i !== ankhIndex));
      setCollectedAnkhs((prev) => prev + 1);
      setScore((prev) => prev + 150);
      setIsInvincible(true);
      setGameMessage("ANKH POWER!");
    }

    const mummyCollision = mummies.some(
      (m) => m.x === newPosition.x && m.y === newPosition.y
    );
    if (mummyCollision && !isInvincible) {
      setGameMessage("CAUGHT BY MUMMY!");
      handleGameOver();
      return;
    }

    if (
      newPosition.x === treasurePosition.x &&
      newPosition.y === treasurePosition.y
    ) {
      if (level === 3) {
        setGameMessage("VICTORY!");
        onGameWon();
      } else {
        setLevel((prev) => prev + 1);
        setPlayerPosition({ x: 0, y: 0 });
        setTimeLeft((prev) => prev + 30);
        setScore((prev) => prev + 200);
        setGameMessage("LEVEL UP!");
      }
    }
  };

  // Update keyboard event handler to use handleMove
  useEffect(() => {
    const handleKeyPress = (e) => {
      const newPosition = { ...playerPosition };
      let moved = false;

      switch (e.key) {
        case "ArrowUp":
          if (
            newPosition.y > 0 &&
            !mazeLayout[newPosition.y - 1][newPosition.x]
          ) {
            newPosition.y -= 1;
            moved = true;
          }
          break;
        case "ArrowDown":
          if (
            newPosition.y < GRID_SIZE - 1 &&
            !mazeLayout[newPosition.y + 1][newPosition.x]
          ) {
            newPosition.y += 1;
            moved = true;
          }
          break;
        case "ArrowLeft":
          if (
            newPosition.x > 0 &&
            !mazeLayout[newPosition.y][newPosition.x - 1]
          ) {
            newPosition.x -= 1;
            moved = true;
          }
          break;
        case "ArrowRight":
          if (
            newPosition.x < GRID_SIZE - 1 &&
            !mazeLayout[newPosition.y][newPosition.x + 1]
          ) {
            newPosition.x += 1;
            moved = true;
          }
          break;
        default:
          return;
      }

      if (moved) handleMove(newPosition);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPosition, mazeLayout, level]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="pyramid-maze-game">
      <div className="game-info">
        <div className="level">
          <span className="icon">👑</span>
          {level}
        </div>
        <div className="timer">
          <span className="icon">⌛</span>
          {timeLeft}
        </div>
        <div className="score">
          <span className="icon">💎</span>
          {score}
        </div>
        <div className="scarabs">
          <span className="icon">🏆</span>
          {collectedScarabs}
        </div>
      </div>

      {gameMessage && <div className="game-message">{gameMessage}</div>}

      <div
        className={`maze-grid ${isInvincible ? "invincible" : ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: "2px",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {mazeLayout.map((row, y) =>
          row.map((cell, x) => {
            const visible = isVisible(x, y);
            const hasMummy = mummies.some((m) => m.x === x && m.y === y);
            return (
              <div
                key={`${x}-${y}`}
                className={`maze-cell ${cell ? "wall" : "path"} ${
                  visible ? "visible" : "hidden"
                } ${
                  playerPosition.x === x && playerPosition.y === y
                    ? "player"
                    : ""
                } ${
                  treasurePosition.x === x && treasurePosition.y === y
                    ? "treasure"
                    : ""
                } ${hasMummy ? "mummy" : ""} ${
                  isInvincible ? "invincible" : ""
                }`}
              >
                {visible && (
                  <>
                    {cell ? (
                      <WallIcon />
                    ) : playerPosition.x === x && playerPosition.y === y ? (
                      <div className="player">
                        <PharaohIcon />
                      </div>
                    ) : treasurePosition.x === x && treasurePosition.y === y ? (
                      <TreasureIcon />
                    ) : hasMummy ? (
                      <div className="mummy">🧟</div>
                    ) : torches.some((t) => t.x === x && t.y === y) ? (
                      <div className="torch">🔥</div>
                    ) : scarabs.some((s) => s.x === x && s.y === y) ? (
                      <div className="scarab">🏆</div>
                    ) : ankhs.some((a) => a.x === x && a.y === y) ? (
                      <div className="ankh">☥</div>
                    ) : null}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="game-instructions">
        <p>{isMobile ? "Swipe to Move" : "Use Arrow Keys"}</p>
        <p>🏆 Collect Trophies | ☥ Find Ankhs</p>
        <p>⚠️ Avoid Mummies!</p>
      </div>
    </div>
  );
};

export default PyramidMazeGame;
