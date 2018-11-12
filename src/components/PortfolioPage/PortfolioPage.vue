<template>
  <div class="row">
    <div class="col">
      <h1>Portfolio Page</h1>
      <div class="container">
      <div class="row">
        <ProductCard
          v-for="product in productsList"
          :key="product.name"
          :title="product.name"
          :price="product.price"
          type="buy"
        />
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard/ProductCard';
import { mapState } from 'vuex';

export default {
  name: 'PortfolioPage',
  components: {
    ProductCard,
  },
  computed: {
    ...mapState('stocks', {
      productsList: 'products',
    }),
  },
};
</script>
