import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as CopyIcon } from "../assets/s_icon.svg";

const Footer = ({ currentSlide }) => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <h5 className="mobile">
        {t("ux_best")}
        <span className="icon">
          <CopyIcon />
        </span>
        {t("year")}
      </h5>
      <h5 className="desktop">
        {t("international_solutions")}
        {currentSlide !== 3 && (
          <>
            <span className="icon">
              <CopyIcon />
            </span>
            {t("copyright")}
          </>
        )}
      </h5>
    </footer>
  );
};

export default Footer;
