import React, { useState } from "react";
import { ReactComponent as SIcon } from "../../assets/s_icon.svg";
import { ReactComponent as BgEgypt } from "../../assets/egypt/bg_egypt.svg";
import { ReactComponent as InstagramIcon } from "../../assets/travels/instagram_icon.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrow_right_link.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import InstagramSidebar from "../travels/InstagramSidebar";

const SolvedPyramidPuzzle = ({ restart, setAnimationStageBg }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setAnimationStageBg(!isVisible);
    setIsVisible(!isVisible);
  };

  return (
    <div className="solve-puzzle-container solved-puzzle">
      <p className="small-text">ANCIENT WISDOM REVEALED</p>
      <h1>
        The <SIcon />
        ecret
      </h1>
      <h2>of the Pharaohs</h2>
      <p className="discover">
        You've discovered the hidden treasure! <br /> The ancient Egyptians left
        behind more than just gold...
      </p>
      <p className="discover discover_more">
        Their wisdom continues to inspire us today
      </p>
      <InstagramSidebar />

      <h6>Follow the path of the ancients</h6>

      <div className={`button-and-content ${isVisible ? "expanded" : ""}`}>
        <button
          className="start-game-button meet-seredesi-button"
          onClick={handleToggle}
        >
          DISCOVER MORE
        </button>

        <div className={`hidden-content ${isVisible ? "visible" : ""}`}>
          <div className="hidden-section social-section">
            <p className="small_title">JOIN THE JOURNEY</p>

            <a
              className="big-link"
              href="https://www.instagram.com/selectiveredesign/"
            >
              <InstagramIcon className="instagram-icon" />{" "}
              <span>SelectiveReDESIGN</span>
            </a>
          </div>

          <div className="hidden-section navigation-section">
            <p className="small_title">CONTINUE EXPLORING</p>
            <Link to="/egypt" onClick={restart} className="big-link">
              <ArrowRight />
              <span>RETURN TO</span> THE PYRAMID
            </Link>
          </div>

          <div className="hidden-section footer-section">
            <p className="small_title">LEARN MORE</p>
            <Link to="/" className="big-link">
              <ArrowRight />
              VISIT <span>HOME PAGE</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolvedPyramidPuzzle;
