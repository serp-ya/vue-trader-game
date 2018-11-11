<template>
  <div class="col-4 product-card">
    <div class="product-card__title">
      Name: {{ title }}
    </div>
    <div class="product-card__price">
      {{ price | currencyFormat }}
    </div>
    <button v-if="productType === 'buy'">Buy</button>
    <button v-else-if="productType === 'sell'">Sell</button>
    <button v-else>Do nothing</button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    productType: {
      type: String,
      default: 'buy',
    },
    title: {
      type: String,
      isRequire: true,
    },
    price: {
      type: Number,
      isRequire: true,
    },
  },
};
</script>
