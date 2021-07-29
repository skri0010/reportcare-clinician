import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultLanguage, LanguageID } from "util/language";
import translationEN from "./translations/en.json";
import translationMS from "./translations/ms.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources: { [key in LanguageID]: any } = {
  [LanguageID.en]: {
    translation: translationEN
  },
  [LanguageID.ms]: {
    translation: translationMS
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    lng: defaultLanguage.toString(), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // allow keys to be phrases having `:`, `.`
    nsSeparator: false,
    interpolation: {
      escapeValue: false // react already safe from xss
    }
  });

export default i18n;
