<template>
  <div class="row">
    <div class="col">
      <h1>Stocks Page</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StocksPage',
  computed: {
    ...mapGetters({
      myFunds: 'getFunds',
    }),
  },
};
</script>
