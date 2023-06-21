declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

import { VueI18n } from "vue-i18n";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: VueI18n["t"];
  }
}
