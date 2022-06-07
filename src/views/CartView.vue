<template>
  <CartItems />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CartItems from "@/components/CartItems.vue";
export default defineComponent({
  name: "CartView",
  components: {
    CartItems,
  },
});
</script>
