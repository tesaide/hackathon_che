import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { uk } from "./uk";
import { en } from "./en";
import { fr } from "./fr";
import { pl } from "./pl";
import { de } from "./de";

const resources = {
  en,
  uk,
  pl,
  fr,
  de,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uk", // Default language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
