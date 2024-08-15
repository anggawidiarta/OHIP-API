import "./assets/main.css";
import "vue3-json-viewer/dist/index.css";

import JsonViewer from "vue3-json-viewer";
import { createApp } from "vue";
import { createPinia } from "pinia";

import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).use(JsonViewer).use(AOS.init());

app.mount("#app");
