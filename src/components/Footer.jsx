import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as CopyIcon } from "../assets/s_icon.svg";
import { Link } from "react-router-dom";

const Footer = ({ currentSlide, customText }) => {
  const { t } = useTranslation();

  return (
    <footer className={`footer ${customText ? "custom-text" : ""}`}>
      <h5 className="mobile">{customText || t("international_solutions")}</h5>
      <div className="desktop">
        {!customText && (
          <>
            <h5>{t("international_solutions")}</h5>
            <div className="copy">
              <CopyIcon />
              <span>2024/25</span>
            </div>
          </>
        )}
      </div>
      {customText && (
        <div className="right-content">
          <Link to="/" className="custom-link">
            {customText}
          </Link>
          <div className="ux-best-practices">
            <span>UX best practices</span>
            <div className="copy">
              <CopyIcon />
              <span>2024/25</span>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
