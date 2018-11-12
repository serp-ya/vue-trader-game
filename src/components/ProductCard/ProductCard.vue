<template>
  <div class="col-6">
    <div
      class="product-card"
      :class="productCardStyles"
    >
      <div class="product-card__header">
        <div class="product-card__title">
          {{ title }}
        </div>
        <div class="product-card__info">
          (Price: {{ price | currencyFormat }}{{ quantityInfo }})
        </div>
      </div>

      <div class="product-card__body">
        <input
          class="product-card__quantity-input"
          type="text"
          placeholder="quantity"
          v-model.number="quantity"
          @keypress="isNumberInput"
          @keydown="error = ''"
        />

        <button
          class="product-card__button"
          v-if="productType === 'buy'"
          @click="buyClickHandler"
          :disabled="quantity <= 0 || !checkEnoughFunds"
        >{{ checkEnoughFunds ? 'Buy' : 'Not enough funds'}}
        </button>

        <button
          class="product-card__button"
          v-else-if="productType === 'sell'"
          @click="sellClickHandler"
          :disabled="quantity <= 0 || !checkEnoughQuantity"
        >{{ checkEnoughQuantity ? 'Sell' : 'Not enough quantity'}}
        </button>

        <button
          class="product-card__button"
          v-else
          :disabled="quantity <= 0"
        >Do nothing
        </button>
      </div>

      <div class="product-card__error" v-if="error">
        <div class="alert alert-danger">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import utils from '@/utils';

const { isNumberInput } = utils;

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

    playersQuantity: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      quantity: '',
      error: '',
    };
  },

  computed: {
    ...mapState('player', [
      'funds',
    ]),

    productCardStyles() {
      return {
        'product-card_type_buy': this.productType === 'buy',
        'product-card_type_sell': this.productType === 'sell',
      };
    },

    cost() {
      return this.price * this.quantity;
    },

    checkEnoughFunds() {
      if (isNaN(this.cost)) {
        return false;
      }

      return this.cost < this.funds;
    },

    checkEnoughQuantity() {
      return this.quantity <= this.playersQuantity;
    },

    purchase() {
      const { title: name, quantity, cost } = this;
      return { name, quantity, cost };
    },

    quantityInfo() {
      return this.productType === 'sell' ? `, Quantity: ${this.playersQuantity}` : '';
    },
  },

  methods: {
    isNumberInput,

    ...mapMutations('player', [
      'buyStocks',
      'sellStocks',
    ]),

    cleanQuantity() {
      this.quantity = '';
    },

    buyClickHandler() {
      const purchase = this.purchase;
      const isEnoughFunds = this.checkEnoughFunds;
      this.cleanQuantity();

      if (!isEnoughFunds) {
        this.error = 'Does\'t enough funds';
        return;
      } else if (purchase.quantity <= 0) {
        this.error = 'Quantity of the purchase items can\'t be less or equal than zero';
        return;
      }

      this.buyStocks({ purchase });
    },

    sellClickHandler() {
      const purchase = this.purchase;
      this.cleanQuantity();

      if (!this.checkEnoughQuantity) {
        this.error = 'Does\'t enough stocks';
        return;
      } else if (purchase.quantity <= 0) {
        this.error = 'Quantity of the purchase items can\'t be less or equal than zero';
        return;
      }

      this.sellStocks({ purchase });
    },
  },
};
</script>

<style>
.product-card {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 15px;
  border: 1px solid rgba(0,0,0, 0.1);
  border-radius: 5px;
}

.product-card_type_buy .product-card__header {
  background-color: rgba(0, 0, 255, 0.05);
}

.product-card_type_sell .product-card__header {
  background-color: rgba(255, 0, 0, 0.05);
}

.product-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
  padding: 15px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.product-card__title {
  font-size: 24px;
  font-weight: bold;
}

.product-card__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;;
}

.product-card__quantity-input {
  padding: 5px;
  border-radius: 5px;
}

.product-card__button {
  padding: 5px 25px;
  border-radius: 5px;
}

.product-card_type_buy .product-card__button {
  background-color: rgba(0, 0, 255, 0.05);
}

.product-card_type_sell .product-card__button {
  background-color: rgba(255, 0, 0, 0.05);
}

.product-card__error {
  padding: 10px;
  padding-bottom: 0;
}

.product-card__error .alert {
  margin-bottom: 0;
}
</style>
