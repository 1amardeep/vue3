import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/global.css";
import { projectAuth } from "./firebase/config";
import { createPinia } from "pinia";

let app: any;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).use(createPinia()).mount("#app");
  }
});
