import Vue from 'vue';

const stocks = {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    addProducts: (state, { products }) => {
      if (Array.isArray(products)) {
        state.products = [...state.products, ...products];
      }
    },
  },
  actions: {
    requestProducts: async ({ commit }) => {
      try {
        commit('clearGlobalErrors', null, { root: true });
        commit('setLoaderState', { newLoaderState: true }, { root: true });

        const productsRes = await Vue.http.get('goods.json');
        const products = await productsRes.json();

        commit('addProducts', { products });
        commit('setLoaderState', { newLoaderState: false }, { root: true });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        commit('addGlobalErros', { errorsList: ['Unknown error'] }, { root: true });
        commit('setLoaderState', { newLoaderState: false }, { root: true });
      }
    },
  },
};

export default stocks;
