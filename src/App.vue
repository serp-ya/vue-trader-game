<template>
  <div class="container main-wrapper" id="app">
    <Header />
    <div class="col-12 text-center" v-if="showLoader">
      <img src="./assets/preloader.gif">
    </div>
    <div class="main-content" v-else>
      <div class="col-12" v-if="errorsList.length > 0">
        <h3>Erros!</h3>
        <p v-for="error in errorsList" :key="error">
          {{ error }}
        </p>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
  },
  computed: {
    ...mapState({
      showLoader: 'showLoader',
      errorsList: 'globalErrors',
    }),
  },
  methods: {
    ...mapActions('player', [
      'initPlayerDataAction',
    ]),
    ...mapActions('stocks', [
      'requestProducts',
    ]),
  },
  created() {
    this.initPlayerDataAction();
    this.requestProducts();
  },
};
</script>

<style>
.main-wrapper {
  padding-top: 15px;
  padding-bottom: 25px;
}
.main-content {
  padding: 10px 15px;
  border: 1px solid rgba(0,0,0, 0.1);
  border-radius: 5px;
}
</style>
