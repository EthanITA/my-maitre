import { createI18n } from "vue-i18n";
import en from "./en";
import it from "./it";

export default createI18n({
  locale: "it",
  allowComposition: true,
  fallbackLocale: "it",
  silentTranslationWarn: true,
  messages: {
    en,
    it,
  },
});
