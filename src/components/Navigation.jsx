import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { name: t("what_is"), path: "/" },
    { name: t("who_gain"), path: "/who-gain" },
    { name: t("how_to_use"), path: "/how-to-use" },
    { name: t("try_us"), path: "/try-us" },
  ];

  return (
    <nav className="navigation">
      <ul>
        {navItems.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
