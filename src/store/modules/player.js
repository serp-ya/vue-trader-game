export default {
  state: {
    id: '',
    funds: 10000,
  },
  getters: {
    getId: state => state.id,
    getFunds: state => state.funds,
  },
  mutations: {
    addFunds: (state, { funds }) => {
      state.funds += funds;
    },
  },
  actions: {
    addFundsAction: ({ commit }, { funds }) => {
      commit('addFunds', { funds });
    },
  },
};
