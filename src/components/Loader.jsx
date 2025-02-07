import React, { useEffect, useState } from "react";
import { ReactComponent as S } from "../assets/logo_pion/pion_s.svg";
import { ReactComponent as I } from "../assets/logo_pion/pion_i.svg";
import { ReactComponent as R } from "../assets/logo_pion/pion_r.svg";
import { ReactComponent as E } from "../assets/logo_pion/pion_e.svg";
import { ReactComponent as D } from "../assets/logo_pion/pion_d.svg";
import { ReactComponent as S2 } from "../assets/logo_pion/pion_s_2.svg";

import { ReactComponent as S_M } from "../assets/logo_poziom/s.svg";
import { ReactComponent as E_M } from "../assets/logo_poziom/e.svg";
import { ReactComponent as R_M } from "../assets/logo_poziom/r.svg";
import { ReactComponent as I_M } from "../assets/logo_poziom/i.svg";
import { ReactComponent as D_M } from "../assets/logo_poziom/d.svg";
import { ReactComponent as S2_M } from "../assets/logo_poziom/s_2.svg";

const desktopOrder = [I, S2, E, D, E, R, E, S]; // Reversed order for desktop
const mobileOrder = [I_M, S2_M, E_M, D_M, E_M, R_M, E_M, S_M]; // Reversed order for mobile

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="loader-container"
      style={{
        background: "$background",
        zIndex: 500,
        position: "fixed",
        width: "100vw",
        height: "100vh",
        padding: "22px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="line top-line"></div>

      <div className="logo-container">
        <div className="desktop-logo">
          {desktopOrder.map((Letter, index) => (
            <Letter
              key={index}
              className="desktop-letter"
              style={{
                animationDelay: `${index * 0.11}s`,
                transform: `translateX(${index * 6}px)`,
              }}
            />
          ))}
        </div>

        <div className="mobile-logo">
          {mobileOrder.map((Letter, index) => (
            <Letter
              key={index}
              className="mobile-letter"
              style={{
                animationDelay: `${index * 0.11}s`,
                transform: `translateY(${index * 6}px)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="line bottom-line"></div>
    </div>
  );
};

export default Loader;
