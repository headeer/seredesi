import React from "react";
import { animated, useSpring } from "react-spring";

const Obstacle = ({ type, lane, y }) => {
  const style = useSpring({
    left: `${33.33 * lane}%`,
    top: `${y}%`,
  });

  const renderObstacle = () => {
    switch (type) {
      case "rock":
        return (
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M10 30 Q15 10 25 15 Q35 20 30 30 Z"
              fill="#808080"
              stroke="#696969"
              strokeWidth="2"
            />
            {/* Rock texture */}
            <path
              d="M15 20 Q20 25 25 20"
              fill="none"
              stroke="#696969"
              strokeWidth="1"
            />
            <path
              d="M20 15 Q25 20 20 25"
              fill="none"
              stroke="#696969"
              strokeWidth="1"
            />
          </svg>
        );

      case "log":
        return (
          <svg width="50" height="30" viewBox="0 0 50 30">
            {/* Log body */}
            <path
              d="M5 10 Q25 5 45 10 Q45 20 25 25 Q5 20 5 10"
              fill="#8B4513"
              stroke="#654321"
              strokeWidth="2"
            />
            {/* Wood rings */}
            <ellipse cx="25" cy="15" rx="3" ry="2" fill="#654321" />
            <ellipse cx="15" cy="15" rx="2" ry="1.5" fill="#654321" />
            <ellipse cx="35" cy="15" rx="2" ry="1.5" fill="#654321" />
          </svg>
        );

      case "shark":
        return (
          <svg width="60" height="40" viewBox="0 0 60 40">
            {/* Shark fin */}
            <path
              d="M20 20 L30 5 L40 20 Z"
              fill="#2F4F4F"
              stroke="#2F4F4F"
              strokeWidth="2"
            />
            {/* Water splash */}
            <path
              d="M15 20 Q30 25 45 20"
              fill="none"
              stroke="#87CEEB"
              strokeWidth="2"
            />
            <path
              d="M20 22 Q30 27 40 22"
              fill="none"
              stroke="#87CEEB"
              strokeWidth="1.5"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <animated.div className={`obstacle ${type}`} style={style}>
      {renderObstacle()}
    </animated.div>
  );
};

export default Obstacle;
