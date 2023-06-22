/// <reference types="vite/client" />
import { VueI18n } from "vue-i18n";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: VueI18n["t"];
    $tc: VueI18n["tc"];
    $te: VueI18n["te"];
    $d: VueI18n["d"];
    $n: VueI18n["n"];
    $tm: VueI18n["tm"];
    $locale: VueI18n["locale"];
    $getLocales: VueI18n["getLocales"];
    $setLocale: VueI18n["setLocale"];
    $i18n: VueI18n;
  }
}
