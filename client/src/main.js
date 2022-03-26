import Vue from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./plugins/axios";
import "./plugins/customComponents";

import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
