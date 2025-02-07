import React from "react";
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

const desktopOrder = [S, E, R, E, D, E, S2, I];
const mobileOrder = [S_M, E_M, R_M, E_M, D_M, E_M, S2_M, I_M];

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="desktop-logo">
        {desktopOrder.map((Letter, index) => (
          <Letter key={index} className="desktop-letter" />
        ))}
      </div>

      <div className="mobile-logo">
        {mobileOrder.map((Letter, index) => (
          <Letter key={index} className="mobile-letter" />
        ))}
      </div>
    </div>
  );
};

export default Logo;
