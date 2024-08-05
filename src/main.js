import "./assets/main.css";
import "vue3-json-viewer/dist/index.css";

import JsonViewer from "vue3-json-viewer";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router).use(JsonViewer);

app.mount("#app");
