import React from "react";
import { useSpring, animated } from "react-spring";

const PlayerRaft = () => {
  const paddleAnimation = useSpring({
    from: { transform: "rotate(-15deg)" },
    to: { transform: "rotate(15deg)" },
    config: { duration: 500 },
    loop: { reverse: true },
  });

  return (
    <div className="player-raft">
      {/* Raft Base */}
      <svg width="60" height="40" viewBox="0 0 60 40">
        <path
          d="M5 20 Q30 25 55 20 L60 30 Q30 40 0 30 Z"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="2"
        />
        {/* Wood texture lines */}
        <line
          x1="15"
          y1="22"
          x2="45"
          y2="22"
          stroke="#654321"
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="25"
          x2="50"
          y2="25"
          stroke="#654321"
          strokeWidth="1"
        />
        <line x1="5" y1="28" x2="55" y2="28" stroke="#654321" strokeWidth="1" />
      </svg>

      {/* Animated Paddles */}
      <animated.div className="paddle left" style={paddleAnimation}>
        <svg width="20" height="40" viewBox="0 0 20 40">
          <rect x="8" y="0" width="4" height="30" fill="#8B4513" />
          <path d="M2 25 H18 L10 40 Z" fill="#A0522D" />
        </svg>
      </animated.div>
      <animated.div
        className="paddle right"
        style={{
          ...paddleAnimation,
          transform: paddleAnimation.transform.to((t) => t.replace("-", "")),
        }}
      >
        <svg width="20" height="40" viewBox="0 0 20 40">
          <rect x="8" y="0" width="4" height="30" fill="#8B4513" />
          <path d="M2 25 H18 L10 40 Z" fill="#A0522D" />
        </svg>
      </animated.div>

      {/* Player Character */}
      <div className="player-character">
        <svg width="30" height="40" viewBox="0 0 30 40">
          {/* Body */}
          <circle cx="15" cy="15" r="8" fill="#FFB6C1" />
          {/* Life Vest */}
          <path
            d="M7 15 Q15 25 23 15"
            fill="none"
            stroke="#FF8C00"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div>
  );
};

export default PlayerRaft;
