import "./assets/index.css";
import "vue3-json-viewer/dist/index.css";

import JsonViewer from "vue3-json-viewer";
import { createApp } from "vue";
import { createPinia } from "pinia";

import AOS from "aos";
import "aos/dist/aos.css";

import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app
  .use(pinia)
  .use(router)
  .use(JsonViewer)
  .use(AOS.init())
  .use(Vue3Toastify, { autoClose: 7500, limit: 2 })
  .use(VueSweetalert2);

app.mount("#app");
