/* eslint-disable import/order */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en/translation.json";
import Cookies from "js-cookie";

const resources = {
  en: {
    translation: enTranslation,
  },
};

const savedLanguage = Cookies.get("lang") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
