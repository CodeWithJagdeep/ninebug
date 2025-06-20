import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/home.json";
import sw from "./locales/sw/home.json";
import yo from "./locales/yo/home.json";
import ha from "./locales/ha/home.json";
import ig from "./locales/ig/home.json";

// Add more as needed

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sw: { translation: sw },
      yo: { translation: yo },
      ha: { translation: ha },
      ig: { translation: ig },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
