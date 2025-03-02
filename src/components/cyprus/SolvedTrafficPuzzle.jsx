import React, { useEffect } from "react";
import { ReactComponent as SvgBackgroundRaft } from "../../assets/cyprus/water-background.svg";

const SolvedRaftRushPuzzle = ({ restart, setAnimationStageBg }) => {
  useEffect(() => {
    setAnimationStageBg(1);
  }, [setAnimationStageBg]);

  return (
    <div className="solve-puzzle-container">
      <p className="small-text">RESCUE BOAT REACHED!</p>
      <h1>Victory!</h1>
      <p className="discover">
        You've successfully navigated through the treacherous waters and reached
        the rescue boat! Your quick reflexes and bravery have earned you a place
        among the legendary river rafters!
      </p>

      <div className="puzzle-grid-container">
        <SvgBackgroundRaft className="background" />
        <h4>
          MISSION <span>COMPLETE</span>
        </h4>
        <h5>
          RIVER <span>MASTERED</span>
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

export default SolvedRaftRushPuzzle;
