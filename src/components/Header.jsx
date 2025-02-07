import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import LanguageMenu from "./LanguageMenu.jsx";
import { useSlide } from "../context/SlideContext.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentSlide } = useSlide();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header id="top">
      <div
        className={`language-menu-wrapper ${
          currentSlide !== 0 ? "hide" : "show"
        }`}
      >
        <LanguageMenu />
      </div>
      <Logo />
    </header>
  );
};

export default Header;
