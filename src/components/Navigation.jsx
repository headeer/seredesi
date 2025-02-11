import React from "react";
import { useTranslation } from "react-i18next";
import { useSlide } from "../context/SlideContext";

const Navigation = () => {
  const { t } = useTranslation();
  const { setCurrentSlide, currentSlide } = useSlide();

  const navItems = [
    { name: t("what_is"), slide: 0 },
    { name: t("who_gain"), slide: 1 },
    { name: t("how_to_use"), slide: 2 },
    { name: t("try_us"), slide: 3 },
  ];

  const handleNavigation = (slide) => {
    setCurrentSlide(slide);
  };

  return (
    <nav className="navigation">
      <ul>
        {navItems.map((item) => (
          <li
            key={item.slide}
            className={currentSlide === item.slide ? "active" : ""}
          >
            <button onClick={() => handleNavigation(item.slide)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
