import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage/HomePage';
import PortfolioPage from '@/components/PortfolioPage/PortfolioPage';
import StocksPage from '@/components/StocksPage/StocksPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/portfolio',
      name: 'PortfolioPage',
      component: PortfolioPage,
    },
    {
      path: '/stocks',
      name: 'StocksPage',
      component: StocksPage,
    },
  ],
});
