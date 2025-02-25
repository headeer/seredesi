import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useSlide } from "../context/SlideContext";
import { ReactComponent as SIcon } from "../assets/s_bg.svg";
import { useLocation } from "react-router-dom";

const menuItems = [
  { key: "meet_seredesi", slide: 0, path: null },
  { key: "who_gains", slide: 1, path: null },
  { key: "how_to_use", slide: 2, path: null },
  { key: "try_us", slide: 3, path: null },
  { key: "travel", slide: "/travels", path: "/travels" },
  { key: "egypt", slide: "/egypt", path: "/egypt" },
];

const MobileMenu = ({ isOpen, toggleMenu, handleMenuClick }) => {
  const { t } = useTranslation();
  const { currentSlide } = useSlide();
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="menu-header">
            <h2>
              SE<span className="red">lective</span> REDESI
              <span className="red">gn</span>
            </h2>
            <p>{t("selective_redesign_description")}</p>
          </div>
          <nav className="menu-items">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item.slide, item.path)}
                className={`menu-item ${
                  location.pathname === "/" && currentSlide === item.slide
                    ? "active"
                    : location.pathname === item.path
                    ? "active"
                    : ""
                }`}
              >
                {t(item.key)}
                {(item.key === "travel" || item.key === "egypt") && <SIcon />}
              </button>
            ))}
          </nav>
          <div className="menu-footer">
            <p>{t("have_a_good_day")}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
