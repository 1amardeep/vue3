<template>
  <div class="card">
    <div class="card_item" v-for="cart in cartItems" :key="cart.id">
      <img :src="cart.url" :alt="cart.name" height="150" />
      <p>{{ cart.name }}</p>
      <p>&#8377;{{ cart.price }}</p>
      <p>{{ cart.tag }}</p>
      <button
        class="btn"
        :class="{ selected: cart.selected }"
        @click="selected(cart)"
      >
        <span class="material-icons"> shopping_cart </span>
      </button>
      <button class="btn" @click="edit(cart.id)">
        <span class="material-icons"> edit </span>
      </button>
    </div>
  </div>
  <CartDrawer :cartDrawerItems="cartDrawerItems" v-if="selectedItemToCart" />
  <SpinnerLoader v-if="showSpinner" />
</template>

<script>
import CartDrawer from "@/components/CartDrawer.vue";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import { computed, onMounted } from "vue";
import cartCrudOperation from "@/composables/cartCrudOperation";
import { useRouter } from "vue-router";

export default {
  name: "CartItems",
  components: {
    CartDrawer,
    SpinnerLoader,
  },
  setup() {
    const { showSpinner, cartItems, getCartData, selected, cartDrawerItems } =
      cartCrudOperation();
    const router = useRouter();

    const selectedItemToCart = computed(() => {
      if (cartItems.value.length > 0) {
        return (
          cartItems.value.filter((cartItem) => {
            return cartItem.selected;
          }).length > 0
        );
      }
      return false;
    });

    onMounted(async () => {
      showSpinner.value = true;
      getCartData();
    });

    const edit = function (id) {
      router.push({ name: "cartitemDetails", params: { id: id } });
    };

    return {
      cartItems,
      cartDrawerItems,
      showSpinner,
      selectedItemToCart,
      selected,
      edit,
    };
  },
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 10%;
  width: 75%;
}

.card_item:hover {
  box-shadow: 5px 5px 10px 5px #e0d2d2;
}
.card_item {
  background: #fcf5e8;
  margin: 10px 20px;
  border: 1px solid#e0d2d2;
  min-width: 200px;
}

.selected {
  background: #747ad1;
  color: white;
}
</style>
