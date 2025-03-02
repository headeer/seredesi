import React from "react";
import { animated, useSpring } from "react-spring";

const PowerUp = ({ lane, y }) => {
  const style = useSpring({
    left: `${33.33 * lane}%`,
    top: `${y}%`,
  });

  const glowAnimation = useSpring({
    from: { opacity: 0.4, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1.2)" },
    config: { duration: 1000 },
    loop: { reverse: true },
  });

  return (
    <animated.div className="power-up" style={style}>
      <animated.div className="power-up-glow" style={glowAnimation}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          {/* Outer ring */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
          />

          {/* Inner glow */}
          <circle cx="20" cy="20" r="12" fill="#FFD700" opacity="0.3" />

          {/* Speed arrows */}
          <path d="M15 25 L25 20 L15 15 Z" fill="#FFD700" />
          <path d="M20 25 L30 20 L20 15 Z" fill="#FFD700" opacity="0.7" />
        </svg>
      </animated.div>
    </animated.div>
  );
};

export default PowerUp;
