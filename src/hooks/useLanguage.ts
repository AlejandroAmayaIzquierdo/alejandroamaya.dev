import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Actualizar el atributo lang del HTML
    console.log("Setting document language to:", i18n.language);
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return { language: i18n.language, changeLanguage: i18n.changeLanguage };
};
