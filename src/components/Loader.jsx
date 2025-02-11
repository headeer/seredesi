import React, { useEffect, useState } from "react";
import { ReactComponent as S } from "../assets/logo_desktop_loader/s_poz.svg";
import { ReactComponent as I } from "../assets/logo_desktop_loader/i_poz.svg";
import { ReactComponent as R } from "../assets/logo_desktop_loader/r_poz.svg";
import { ReactComponent as E } from "../assets/logo_desktop_loader/e_poz.svg";
import { ReactComponent as D } from "../assets/logo_desktop_loader/d_poz.svg";
import { ReactComponent as S2 } from "../assets/logo_desktop_loader/s2_poz.svg";

import { ReactComponent as S_M } from "../assets/logo_pion/pion_s.svg";
import { ReactComponent as E_M } from "../assets/logo_pion/pion_e.svg";
import { ReactComponent as R_M } from "../assets/logo_pion/pion_r.svg";
import { ReactComponent as I_M } from "../assets/logo_pion/pion_i.svg";
import { ReactComponent as D_M } from "../assets/logo_pion/pion_d.svg";
import { ReactComponent as S2_M } from "../assets/logo_pion/pion_s_2.svg";

const desktopOrder = [S, E, R, E, D, E, S2, I]; // Reversed order for desktop
const mobileOrder = [I_M, S2_M, E_M, D_M, E_M, R_M, E_M, S_M]; // Reversed order for mobile

const Loader = ({ duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    isVisible && (
      <div
        className="loader-container"
        style={{
          background: "$background",
          zIndex: 500,
          position: "absolute",
          width: "100vw",
          left: "0",
          top: "0",
          height: "100vh",
          padding: "22px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="logo-container">
          <div className="line top-line desktop"></div>
          <div className="desktop-logo desktop">
            {desktopOrder.map((Letter, index) => (
              <Letter
                key={index}
                className="letter-desktop"
                style={{
                  animationDelay: `${index * 0.11}s`,
                  transform: `translateX(${index * 6}px)`,
                }}
              />
            ))}
          </div>

          <div className="mobile-logo mobile">
            {mobileOrder
              .slice()
              .reverse()
              .map((Letter, index) => (
                <Letter
                  key={index}
                  className="letter-mobile"
                  style={{
                    animationDelay: `${index * 0.11}s`,
                    transform: `translateY(${index * 6}px)`,
                  }}
                />
              ))}
          </div>
          <div className="line bottom-line"></div>
        </div>
      </div>
    )
  );
};

export default Loader;
