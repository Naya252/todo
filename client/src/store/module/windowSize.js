export default {
  state: () => ({
    windowSize: {},
  }),

  mutations: {
    SET_WINDOW_SIZE: (state, data) => {
      state.windowSize = data;
    },
  },
  getters: {
    GET_WINDOW_SIZE(state) {
      return state.windowSize;
    },
  },
};
