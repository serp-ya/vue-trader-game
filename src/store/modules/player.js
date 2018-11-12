const player = {
  namespaced: true,
  state: {
    id: '',
    funds: 0,
    products: [],
  },
  getters: {
    getProducts: (state, getters, rootState) => state.products.map((myProd) => {
      const price = rootState.stocks.products.find(prod => prod.name === myProd.name).price;
      const result = { ...myProd, price };
      return result;
    }),
  },
  mutations: {
    setFunds: (state, { funds }) => {
      state.funds = funds;
    },
    addFunds: (state, { funds }) => {
      state.funds += funds;
    },
  },
};


export default player;
