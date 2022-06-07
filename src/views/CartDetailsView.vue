<template>
  <CartItemsDetail />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CartItemsDetail from "@/components/CartItemsDetail.vue";
export default defineComponent({
  name: "CartDetailsView",
  components: {
    CartItemsDetail,
  },
});
</script>
