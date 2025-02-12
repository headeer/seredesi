import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import LanguageMenu from "./LanguageMenu.jsx";
import { useSlide } from "../context/SlideContext.jsx";
import { ReactComponent as MobileMenuIcon } from "../assets/mobile-menu.svg";
import { ReactComponent as MobileMenuIconOpen } from "../assets/mobile_menu_open.svg";
import MobileMenu from "./MobileMenu.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentSlide, setCurrentSlide } = useSlide();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMenuClick = (slide, path) => {
    if (location.pathname === "/travels" && slide !== null) {
      navigate("/");
    }
    if (slide !== null) {
      setCurrentSlide(slide);
    }
    if (path) {
      navigate(path);
    }
    toggleMenu();
  };

  return (
    <header
      id="top"
      className={`${currentSlide !== 0 ? "header_short" : "header_long"}`}
    >
      <div
        className={`language-menu-wrapper ${
          currentSlide !== 0 ? "hide" : "show"
        }`}
      >
        <LanguageMenu />
      </div>
      <div className="logo_mobile">
        <Logo />
        <div className="mobile-menu-icon-container mobile" onClick={toggleMenu}>
          {!isMenuOpen ? (
            <MobileMenuIcon
              className="mobile-menu-icon"
              style={{
                opacity: isMenuOpen ? 0 : 1,
                transition: "all 0.3s ease",
              }}
            />
          ) : (
            <MobileMenuIconOpen
              className="mobile-menu-icon-open"
              style={{
                transition: "all 0.3s ease",
                opacity: isMenuOpen ? 1 : 0,
              }}
            />
          )}
        </div>
      </div>

      <div
        className={`mobile-menu-container ${
          isMenuOpen ? "opened" : "closing"
        } ${currentSlide === 0 ? "open" : ""}`}
      >
        <MobileMenu
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          handleMenuClick={handleMenuClick}
        />
      </div>
    </header>
  );
};

export default Header;
