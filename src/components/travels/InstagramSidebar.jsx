import React, { useState, useEffect, useRef } from "react";
import instagramIcon from "../../assets/seredesi_face.jpg";
import { ReactComponent as ExpandIcon } from "../../assets/travels/diamond_icon.svg"; // This is your clickable icon for expanding
import { useTranslation } from "react-i18next";

const InstagramSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="instagram-sidebar-container" ref={sidebarRef}>
      <div
        className={`sidebar-icon ${isOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <ExpandIcon />
      </div>

      <div className={`sidebar-content ${isOpen ? "visible" : "hidden"}`}>
        <div className="social-section">
          <p className="small_title">Join Secret Community</p>

          <a
            className="big-link"
            href="https://www.skool.com/selective-explorers-5234/about"
          >
            <img src={instagramIcon} className="instagram-icon" />{" "}
            <span>SelectiveReDESIGN</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstagramSidebar;
