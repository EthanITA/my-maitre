import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import i18n from "./i18n";
import { createPinia } from "pinia";
import { stores } from "./models/Custom/API.ts";
import notification from "./store/notification.ts";
import loader from "./store/loader.ts";

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(i18n).mount("#app");
stores.setLoaderStore(loader);
stores.setNotificationStore(notification);
