import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "pl", label: "Polski" },
  { code: "ar", label: "العربية" },
];

const LanguageMenu = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang); // 🌍 Changes the language in i18n
    localStorage.setItem("selectedLanguage", lang); // 💾 Optional: Store language preference
  };

  return (
    <div className="language-menu">
      {LANGUAGES.map((lang) => (
        <a
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`cta-small link ${
            currentLang === lang.code ? "active" : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          {lang.code.toUpperCase()}
        </a>
      ))}
    </div>
  );
};

export default LanguageMenu;
