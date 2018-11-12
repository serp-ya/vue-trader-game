const player = {
  namespaced: true,
  state: {
    id: '',
    funds: 10000,
  },
  mutations: {
    addFunds: (state, { funds }) => {
      state.funds += funds;
    },
  },
};


export default player;
