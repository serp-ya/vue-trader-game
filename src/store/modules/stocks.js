import Vue from 'vue';

export default {
  state: {
    products: [],
  },
  getters: {
    getProducts: state => state.products,
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
        commit('clearGlobalErrors');
        commit('setLoaderState', { newLoaderState: true });
        const productsRes = await Vue.http.get('goods.json');
        const products = await productsRes.json();

        commit('addProducts', { products });
        commit('setLoaderState', { newLoaderState: false });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        commit('addGlobalErros', { errorsList: ['Unknown error'] });
        commit('setLoaderState', { newLoaderState: false });
      }
    },
  },
};
