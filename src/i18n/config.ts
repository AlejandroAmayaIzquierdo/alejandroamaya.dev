import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "../locales/en/translation.json";
import esTranslation from "../locales/es/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

i18n
  .use(LanguageDetector) // Detecta idioma del navegador
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "es", // Idioma por defecto
    lng: "es", // Idioma inicial
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
    detection: {
      // Orden de detección: primero localStorage, luego navegador, luego HTML tag
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"], // Guarda la preferencia en localStorage
    },
  });

export default i18n;
