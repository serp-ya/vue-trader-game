<template>
  <div class="row">
    <div class="col">
      <h1>Stocks Page</h1>
      <div class="container">
        <div class="row">
          <div class="col-12" v-if="productsList.length > 0">
            <ProductCard
              v-for="product in productsList"
              :key="product.name"
              :title="product.name"
              :price="product.price"
              productType="sell"
            />
          </div>
          <div class="col-12" v-else>
            <p>
              You have no stocks
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard/ProductCard';
import { mapGetters } from 'vuex';

export default {
  name: 'StocksPage',
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters('player', {
      productsList: 'getProducts',
    }),
  },
};
</script>
