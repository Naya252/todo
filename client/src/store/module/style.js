export default {
  state: () => ({
    mainColorLight: "#5E35B1",
    mainColorDark: "#5E35B1",
  }),
  actions: {},
  mutations: {
    CHANGE_MAIN_COLOR(state, val) {
      state.mainColorLight = val;
      state.mainColorDark = val;
      localStorage.setItem("MainColor", val);
    },
    GET_MAIN_COLOR(state) {
      if (localStorage.getItem("MainColor")) {
        state.mainColorLight = localStorage.getItem("MainColor");
        state.mainColorDark = localStorage.getItem("MainColor");
      } else {
        state.mainColorLight = "#5E35B1";
        state.mainColorDark = "#5E35B1";
      }
    },
  },
  getters: {
    GET_MAIN_COLOR_FOR_STYLE_LIGHT(state) {
      return state.mainColorLight;
    },
    GET_MAIN_COLOR_FOR_STYLE_DARK(state) {
      return state.mainColorDark;
    },
  },
};
