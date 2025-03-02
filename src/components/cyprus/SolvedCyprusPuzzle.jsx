import React, { useEffect } from "react";
import { ReactComponent as SvgBackgroundCyprus } from "../../assets/cyprus/svg_background_cyprus.svg";

const SolvedCyprusPuzzle = ({ restart, setAnimationStageBg }) => {
  useEffect(() => {
    setAnimationStageBg(1);
  }, [setAnimationStageBg]);

  return (
    <div className="solve-puzzle-container">
      <p className="small-text">TREASURE FOUND!</p>
      <h1>Victory!</h1>
      <p className="discover">
        You've successfully navigated the underwater ruins and collected the
        ancient treasures. Your bravery and skill have earned you a place among
        the legendary divers of Cyprus!
      </p>

      <div className="puzzle-grid-container">
        <SvgBackgroundCyprus className="background" />
        <h4>
          MISSION <span>COMPLETE</span>
        </h4>
        <h5>
          TREASURES <span>SECURED</span>
        </h5>
      </div>

      <div className="button-and-content">
        <button className="start-game-button" onClick={restart}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
};

export default SolvedCyprusPuzzle;
