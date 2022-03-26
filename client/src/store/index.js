import Vue from "vue";
import Vuex from "vuex";

import windowSize from "./module/windowSize";
import preloader from "./module/preloader";
import menuStore from "./module/menuStore";
import style from "./module/style";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    windowSize,
    preloader,
    menuStore,
    style,
  },
});
