<template>
  <div class="row">
    <div class="col">
      <h1>Portfolio Page</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PortfolioPage',
  computed: {
    ...mapGetters({
      myFunds: 'getFunds',
    }),
  },
};
</script>
