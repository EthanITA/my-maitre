import { createI18n } from "vue-i18n";
import en from "./en.ts";
import it from "./it.ts";

export default createI18n({
  locale: "it",
  messages: {
    it,
    en,
  },
});
