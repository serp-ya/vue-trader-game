import Vue from 'vue';
import utils from '@/utils';

const { priceQuotation } = utils;

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
    updateProductsPrices: (state) => {
      state.products = state.products.map((product) => {
        const cloneProduct = { ...product };
        const newPrice = priceQuotation(cloneProduct.price);
        cloneProduct.price = newPrice;
        return cloneProduct;
      });
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
        commit('updateProductsPrices');
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
