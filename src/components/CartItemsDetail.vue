<template>
  <h1>Details about the product : {{ $route.params.id }}</h1>
  <div v-if="cartItem">
    <h1>{{ cartItem.name }}</h1>
    <img :src="cartItem.url" :alt="cartItem.name" height="200" />
  </div>
  <button class="btn" @click="deleteCart">Delete</button>
  <SpinnerLoader v-if="showSpinner" />
</template>

<script>
import { onMounted, ref } from "vue";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import { useRoute, useRouter } from "vue-router";
import crudOperation from "@/composables/cartCrudOperation";
export default {
  name: "CartItemsDetail",
  components: {
    SpinnerLoader,
  },
  setup() {
    const cartItem = ref(null);
    const route = useRoute();
    const router = useRouter();
    const { showSpinner, getCartByIdAPI, deleteCartCrud } = crudOperation();

    onMounted(async () => {
      cartItem.value = await getCartByIdAPI(route.params.id);
    });

    const deleteCart = async () => {
      await deleteCartCrud(route.params.id);
      router.push({ name: "cartitems" });
    };

    return {
      cartItem,
      showSpinner,
      deleteCart,
    };
  },
};
</script>
