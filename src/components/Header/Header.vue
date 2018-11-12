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
            <span class="nav-link" @click="updateProductsPrices">End Day</span>
          </li>
          <li class="nav-item dropdown">
            <span class="nav-link dropdown-toggle" ref="dropdown">
              Save & Load
            </span>
            <div class="dropdown-menu" :class='dropdownClasses'>
              <span class="dropdown-item" @click="savePlayerData">Save Data</span>
              <span class="dropdown-item" @click="loadPlayerData">Load Data</span>
            </div>
          </li>
          <li class="nav-item">
            <span class="nav-link" style="cursor: default;">
              Funds: {{ myFunds | currencyFormat }}
            </span>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Header',

  data() {
    return {
      dropdownIsOpen: false,
    };
  },

  computed: {
    ...mapState('player', {
      myFunds: 'funds',
    }),

    dropdownClasses() {
      return {
        show: this.dropdownIsOpen,
      };
    },
  },

  methods: {
    ...mapMutations('stocks', [
      'updateProductsPrices',
    ]),

    ...mapActions('player', [
      'savePlayerData',
      'loadPlayerData',
    ]),
  },

  created() {
    document.body.addEventListener('click', (event) => {
      if (event.target === this.$refs.dropdown) {
        this.dropdownIsOpen = true;
      } else {
        this.dropdownIsOpen = false;
      }
    });
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

  .nav-link, .dropdown-item {
    cursor: pointer;
  }
</style>
