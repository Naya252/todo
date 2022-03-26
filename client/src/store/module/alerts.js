export default {
  state: () => ({
    numIndex: 0,
    allAlerts: [
      //   Example
      //     {
      //     type: 'suc',
      //     text: '',
      //     time: 5000,
      //     noclose: true
      // }, {
      //     type: 'info',
      //     text: '',
      //     time: 10000,
      // }, {
      //     type: 'warn',
      //     text: '',
      //     time: 2000,
      // }, {
      //     type: 'err',
      //     text: '',
      //     time: null,
      // }
    ],
  }),
  mutations: {
    SET_ADD_ALERT(state, obj) {
      state.numIndex++;
      obj.numIndex = state.numIndex;
      state.allAlerts.push(obj);
    },
    SET_REMOVE_ALERT(state, value) {
      let val = state.allAlerts.filter((el) => el.numIndex != value);
      state.allAlerts = val;
    },
  },
  getters: {
    GET_ALERTS: (state) => {
      return state.allAlerts;
    },
  },
};
