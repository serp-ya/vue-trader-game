<template>
  <div class="row">
    <div class="col">
      <h1>Portfolio Page</h1>
      <ProductCard
        v-for="product in productsList"
        :key="product.name"
        :title="product.name"
        :price="product.price"
        type="buy"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard/ProductCard';
import { mapGetters } from 'vuex';

export default {
  name: 'PortfolioPage',
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters({
      productsList: 'getProducts',
    }),
  },
  mounted() {
    console.log('this.productsList', this.productsList);
  },
};
</script>
