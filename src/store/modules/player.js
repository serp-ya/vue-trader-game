import Vue from 'vue';
import services from '@/services';

const { localStorageService: storageService } = services;

const player = {
  namespaced: true,
  state: {
    id: storageService.userId,
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

    initPlayer: (state, { id, funds, products = [] }) => {
      storageService.userId = id;
      state.id = id;
      state.funds = funds;
      state.products = products;
    },

    buyStocks: (state, { purchase }) => {
      const { cost, ...productData } = purchase;
      const playersProduct = state.products.find(prod => prod.name === productData.name);
      state.funds -= cost;

      if (playersProduct) {
        playersProduct.quantity += productData.quantity;
      } else {
        state.products = [...state.products, productData];
      }
    },

    sellStocks: (state, { purchase }) => {
      const { cost, ...productData } = purchase;
      const playersProductIndex = state.products.findIndex(prod => prod.name === purchase.name);
      const playersProduct = state.products[playersProductIndex];
      state.funds += cost;

      if (playersProduct.quantity === productData.quantity) {
        state.products.splice(playersProductIndex, 1);
      } else {
        playersProduct.quantity -= productData.quantity;
      }
    },
  },

  actions: {
    initPlayerDataAction: async ({ commit, state, dispatch }) => {
      try {
        const { id } = state;

        if (!id) {
          dispatch('createNewPlayerAction');
        } else {
          dispatch('getPlayerDataAction');
        }
      } catch (error) {
        console.error(error);
        commit('addGlobalErros', { errorsList: ['Player initialisation was faild'] }, { root: true });
      }
    },

    createNewPlayerAction: async ({ commit }) => {
      try {
        const playerData = {
          funds: 10000,
          products: [],
        };

        const newUserDataRes = await Vue.http.post('sessions.json', playerData);
        const newUserData = await newUserDataRes.json();

        if (newUserData.name === undefined) {
          throw new Error('User\'s ID is undefined');
        }

        playerData.id = newUserData.name;
        commit('initPlayer', playerData);
      } catch (error) {
        console.error(error);
        commit('addGlobalErros', { errorsList: ['Player creation was faild'] }, { root: true });
      }
    },

    getPlayerDataAction: async ({ commit, state }) => {
      try {
        const { id } = state;

        if (!id) {
          throw new Error('Unavailable player id');
        }

        const playerDataRes = await Vue.http.get(`sessions/${id}.json`);
        const playerData = await playerDataRes.json();
        playerData.id = id;
        commit('initPlayer', playerData);
      } catch (error) {
        console.error(error);
        commit('addGlobalErros', { errorsList: ['Unavailable user id'] }, { root: true });
      }
    },

    savePlayerData: async ({ commit, state }) => {
      try {
        const { id, funds, products } = state;
        const data = { funds, products };
        const putResultRes = await Vue.http.put(`sessions/${id}.json`, data);
        await putResultRes.json();
      } catch (error) {
        console.error(error);
        commit('addGlobalErros', { errorsList: ['Failed to save user\'s data'] }, { root: true });
      }
    },

    loadPlayerData: async ({ commit, state }) => {
      try {
        const { id } = state;
        const getResultRes = await Vue.http.get(`sessions/${id}.json`);
        const getResult = await getResultRes.json();
        commit('initPlayer', { id, ...getResult });
        commit('stocks/updateProductsPrices', null, { root: true });
      } catch (error) {
        console.error(error);
        commit('addGlobalErros', { errorsList: ['Failed to load user\'s data'] }, { root: true });
      }
    },
  },
};


export default player;
