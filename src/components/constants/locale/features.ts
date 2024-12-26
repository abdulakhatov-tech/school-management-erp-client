import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useLocalFeatures = () => {
  const { i18n } = useTranslation();
  const savedLang = localStorage.getItem("i18nextLng");
  const [currentLang, setCurrentLang] = useState(savedLang || "uz");

  useEffect(() => {
    const supportedLanguages = ["en", "uz", "ru"];
    const normalizedLang = currentLang.split("-")[0];
    if (!supportedLanguages.includes(normalizedLang)) {
      setCurrentLang("uz");
      console.log(currentLang, "current");
      localStorage.setItem("i18nextLng", "uz");
      axios.defaults.headers["Accept-Language"] = "uz";
    } else {
      setCurrentLang(normalizedLang);
      localStorage.setItem("i18nextLng", normalizedLang);
      axios.defaults.headers["Accept-Language"] = normalizedLang;
    }

    // Sync i18next language
    if (i18n.language !== normalizedLang) {
      i18n.changeLanguage(normalizedLang);
    }
  }, [currentLang, i18n]);

  const onLanguageHandler = (lang: string): void => {
    const normalizedLang = lang.split("-")[0]; // Strip region code
    setCurrentLang(normalizedLang);
    localStorage.setItem("i18nextLng", normalizedLang);
    axios.defaults.headers["Accept-Language"] = normalizedLang;
  };
  const capitalizedLang =
    currentLang.charAt(0).toUpperCase() + currentLang.slice(1).toLowerCase();

  return {
    onLanguageHandler,
    capitalizedLang,
    currentLang,
  };
};

export default useLocalFeatures;
