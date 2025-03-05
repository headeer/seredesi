import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ReactComponent as SeredesiLogo } from "../assets/seredesi_logo_icon.svg";
import Footer from "./Footer";
import Navigation from "./Navigation";

const NotFound = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="not-found-container">
      <div className="desktop">
        <Navigation />
      </div>
      <div className="not-found-content">
        <div className="background-logo">
          <SeredesiLogo />
        </div>

        <div className="error-section">
          <h2 className="greeting">{t("hi_there")}</h2>
          <span className="here-is">{t("here_is")}</span>
          <hr />
          <h1>404</h1>
          <p>{t("page_not_exist")}</p>
        </div>

        <Link to="/">
          <button className="form-submit button_not_found">
            <p>{t(isMobile ? "start_journey" : "start_your_journey")}</p>
          </button>
        </Link>
      </div>
      <Footer currentSlide={0} customText={t("go_home")} />
    </div>
  );
};

export default NotFound;
