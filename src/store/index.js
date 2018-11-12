import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showLoader: false,
    globalErrors: [],
    dayNum: 1,
  },
  mutations: {
    setLoaderState: (state, { newLoaderState }) => {
      state.showLoader = newLoaderState;
    },
    addGlobalErros: (state, { errorsList }) => {
      state.globalErrors = [...state.globalErrors, errorsList];
    },
    clearGlobalErrors: (state) => {
      state.globalErrors = [];
    },
  },
  actions: {
    changeLoaderStateAction: ({ commit }, { newLoaderState }) => {
      commit('setLoaderState', { newLoaderState });
    },
    addGlobalErrosAction: ({ commit }, { errorsList }) => {
      commit('addGlobalErros', { errorsList });
    },
  },
  modules,
});
