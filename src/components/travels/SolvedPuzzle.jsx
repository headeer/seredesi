import React, { useState } from "react";
import { ReactComponent as SIcon } from "../../assets/s_icon.svg";
import { ReactComponent as BgTravel } from "../../assets/travels/bg_universe.svg";
import { ReactComponent as InstagramIcon } from "../../assets/travels/instagram_icon.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrow_right_link.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import InstagramSidebar from "./InstagramSidebar";

const SolvedPuzzle = ({ restart, setAnimationStageBg }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="solve-puzzle-container solved-puzzle">
      <p className="small-text">{t("the_right_direction")}</p>
      <h1>
        The <SIcon />
        ecret
      </h1>
      <h2>{t("is_the_universe")}</h2>
      <p className="discover">
        {t("life_project")} <br /> {t("collection_of_goals")}
      </p>
      <p className="discover discover_more">{t("stand_on_hands")}</p>
      <InstagramSidebar />

      <h6>{t("you_the_universe")}</h6>

      <div className={`button-and-content ${isVisible ? "expanded" : ""}`}>
        <button
          className="start-game-button meet-seredesi-button"
          onClick={handleToggle}
        >
          {t("meet_seredesi")}
        </button>

        <div className={`hidden-content ${isVisible ? "visible" : ""}`}>
          <div className="hidden-section social-section">
            <p className="small_title">{t("follow")}</p>

            <a
              className="big-link"
              href="https://www.instagram.com/selectiveredesign/"
            >
              <InstagramIcon className="instagram-icon" />{" "}
              <span>SelectiveReDESIGN</span>
            </a>
          </div>

          <div className="hidden-section navigation-section">
            <p className="small_title">{t("go_back")}</p>
            <Link to="/travels" onClick={restart} className="big-link">
              <ArrowRight />
              <span>{t("travel")}&nbsp;</span>
              {t("to_madeira")}
            </Link>
          </div>

          <div className="hidden-section footer-section">
            <p className="small_title">{t("meet_seredesi")}</p>
            <Link to="/" className="big-link">
              <ArrowRight />
              {t("visit")}&nbsp;<span>{t("home_page")}</span>
            </Link>
          </div>
        </div>
      </div>
      <BgTravel
        className={`travel_background ${isVisible ? "expanded" : ""}`}
      />
    </div>
  );
};

export default SolvedPuzzle;
