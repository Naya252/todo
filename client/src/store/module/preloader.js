export default {
  state: () => ({
    loaderCount: 0,
  }),
  mutations: {
    LOADER_INCREMENT(state) {
      state.loaderCount++;
    },

    LOADER_DECREMENT(state) {
      state.loaderCount--;
    },
  },
  getters: {
    LOADER_SHOW: (state) => {
      return state.loaderCount !== 0;
    },
  },
};
