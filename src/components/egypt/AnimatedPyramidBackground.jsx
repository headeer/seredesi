import React from "react";

const AnimatedPyramidBackground = () => {
  return (
    <svg
      className="animated-pyramid-bg"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className="sky-top" />
          <stop offset="100%" className="sky-bottom" />
        </linearGradient>
        <linearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#ff9800" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="800" height="600" fill="url(#skyGradient)" />

      {/* Sun */}
      <circle className="sun" cx="400" cy="150" r="40" />

      {/* Desert background */}
      <path
        d="M0 400 Q 400 350 800 400 L800 600 L0 600 Z"
        fill="url(#sandGradient)"
        className="desert"
      />

      {/* Main pyramid */}
      <path
        className="pyramid main-pyramid"
        d="M300 450 L500 450 L400 250 Z"
        filter="url(#glow)"
      />

      {/* Background pyramids */}
      <path
        className="pyramid bg-pyramid-1"
        d="M150 470 L300 470 L225 320 Z"
        opacity="0.7"
      />
      <path
        className="pyramid bg-pyramid-2"
        d="M500 470 L650 470 L575 320 Z"
        opacity="0.7"
      />

      {/* Hieroglyphic patterns */}
      <g className="hieroglyphics">
        <rect x="380" y="350" width="40" height="5" />
        <rect x="390" y="360" width="20" height="5" />
        <rect x="385" y="370" width="30" height="5" />
        <circle cx="400" cy="385" r="3" />
      </g>

      {/* Entrance */}
      <path
        className="entrance"
        d="M385 450 L415 450 L400 420 Z"
        fill="#000"
        opacity="0.8"
      />

      {/* Animated light beams */}
      <g className="light-beams">
        <path d="M400 250 L380 450" className="beam" />
        <path d="M400 250 L420 450" className="beam" />
        <path d="M400 250 L400 450" className="beam" />
      </g>

      {/* Floating particles */}
      <g className="particles">
        {[...Array(10)].map((_, i) => (
          <circle
            key={i}
            className={`particle particle-${i}`}
            cx={390 + Math.random() * 20}
            cy={420 + Math.random() * 30}
            r="1"
          />
        ))}
      </g>
    </svg>
  );
};

export default AnimatedPyramidBackground;
