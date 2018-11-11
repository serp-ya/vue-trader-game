<template>
  <div class="main-nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Stock Trader</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="portfolio"
              active-class="main-link-active"
            >
              Portfolio
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="stocks"
              active-class="main-link-active"
            >
             Stocks
            </router-link>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">End Day</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#">
              Save & Load
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Save Data</a>
              <a class="dropdown-item" href="#">Load Data</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Funds: {{ myFunds | currencyFormat }}</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      myFunds: 'getFunds',
    }),
  },
};
</script>

<style scoped>
  .main-nav {
    padding-top: 10px;
    padding-bottom: 15px;
  }

  .main-link-active {
    font-weight: bold;
  }

  .navbar-light .navbar-nav .nav-link {
    color: #000000;
  }

  .navbar-brand {
    font-weight: bold;
    font-size: 24px;
  }
</style>
