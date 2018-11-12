<template>
  <div class="row">
    <div class="col">
      <h1>Trade or View your Portfolio</h1>
      <p>You may Save & Load your Data</p>
      <p>Click on 'End Day' to begin a new Day</p>
      <hr>
      <p class="main-funds-footer">Your Funds: {{myFunds | currencyFormat}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
    ...mapState('player', {
      myFunds: 'funds',
    }),
  },
};
</script>

<style>
.main-funds-footer {
  font-size: 20px;
  font-weight: bold;
}
</style>
