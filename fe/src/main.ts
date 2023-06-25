import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import i18n from "./i18n";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(i18n).mount("#app");
