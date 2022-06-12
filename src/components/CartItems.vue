<template>
  <div class="card">
    <div class="card_item" v-for="cart in cartItemsClone" :key="cart.id">
      <img :src="cart.url" :alt="cart.name" height="150" />
      <p>{{ cart.name }}</p>
      <p>&#8377;{{ cart.price }}</p>
      <p>{{ cart.tag }}</p>
      <div style="position: relative">
        <button
          v-if="cart.count === 0"
          class="btn add_to_cart"
          @click="addItemToCart(cart)"
        >
          Add to Cart
        </button>
        <button v-else class="btn add_to_cart d_flex d_flex_spacearound">
          <div class="incDecCart" @click="removeItemFromCart(cart)">-</div>
          <div>{{ cart.count }}</div>
          <div class="incDecCart" @click="addItemToCart(cart)">+</div>
        </button>
      </div>
      <!-- <button class="btn" @click="edit(cart.id)">
        <span class="material-icons"> edit </span>
      </button> -->
    </div>
  </div>
  <!-- <CartDrawer :cartDrawerItems="cartDrawerItems" v-if="selectedItemToCart" /> -->
  <SpinnerLoader v-if="showSpinner" />
</template>

<script>
// import CartDrawer from "@/components/CartDrawer.vue";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import cartCrudOperation from "@/composables/cartCrudOperation";
import { useRouter } from "vue-router";
import { cartStore } from "@/storage/cartStorage";

export default {
  name: "CartItems",
  components: {
    // CartDrawer,
    SpinnerLoader,
  },
  setup() {
    const { selected, cartDrawerItems } = cartCrudOperation();
    const router = useRouter();
    const cartStorage = cartStore();
    const { cartItems, showSpinner, cartItemsClone } = storeToRefs(cartStorage);
    const { getCartData, addItemToCart, removeItemFromCart } = cartStorage;

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
      if (!cartItemsClone.value.length) await getCartData();
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
      addItemToCart,
      removeItemFromCart,
      cartItemsClone,
    };
  },
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

.add_to_cart {
  width: 100%;
  font-size: 15px;
  padding: 12px;
  margin-top: 0px;
}

.d_flex_spacearound {
  justify-content: space-around;
  box-sizing: border-box;
  padding: 6px;
  display: flex;
  align-items: center;
}

.incDecCart {
  padding: 3px 24px;
  border-radius: 16px;
  background: white;
  color: #583d3d;
  font-size: 16px;
  font-weight: 800;
}
</style>
