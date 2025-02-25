import React from "react";

const PyramidIntro = ({ onStartGame }) => {
  return (
    <div className="pyramid-intro">
      <div className="pyramid-3d">
        <div className="pyramid-face front"></div>
        <div className="pyramid-face left"></div>
        <div className="pyramid-face right"></div>
        <div className="pyramid-face bottom"></div>
        <div className="sun"></div>
        <div className="sand"></div>
      </div>
      <div className="intro-content">
        <h1>The Pyramid Maze</h1>
        <p>Venture deep into the ancient pyramid</p>
        <button onClick={onStartGame} className="start-button">
          Enter the Pyramid
        </button>
      </div>
    </div>
  );
};

export default PyramidIntro;
