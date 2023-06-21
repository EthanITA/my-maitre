import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import i18n from "./i18n";

console.log(i18n);

createApp(App).use(i18n).use(router).mount("#app");
