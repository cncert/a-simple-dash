import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n
import VueSocketio from "vue-socket.io";
import axios from "axios";

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from "../mock";
if (process.env.NODE_ENV === "production") {
  mockXHR();
}

Vue.prototype.$http = axios;

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
Vue.use(
  new VueSocketio({
    debug: true,
    // connection: process.env.VUE_APP_WS_API // 地址+端口，由后端提供
    connection: "ws://192.168.204.134:5000/events" // 地址+端口，由后端提供
  })
);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
