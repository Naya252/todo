export default {
  state: () => ({
    drawerLeft: false,
    mini: false,
  }),

  mutations: {
    SET_MINI(state) {
      if (localStorage.getItem("tokenMini")) {
        if (localStorage.getItem("tokenMini") == "false") {
          state.mini = false;
        }
        if (localStorage.getItem("tokenMini") == "true") {
          state.mini = true;
        }
      } else {
        localStorage.setItem("tokenMini", false);
      }
    },
    TOGGLE_MINI(state) {
      state.mini = !state.mini;
      localStorage.setItem("tokenMini", state.mini);
    },
    TOGGLE_DRAWER(state, value) {
      state.drawerLeft = value;
    },
  },
  getters: {
    GET_MINI(state) {
      return state.mini;
    },
    GET_DRAWER(state) {
      return state.drawerLeft;
    },
  },
};
