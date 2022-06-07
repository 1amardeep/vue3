<template>
  <teleport to="#cart_drawer">
    <div class="cart_drawer">
      <h1 class="cart_drawer_header">My Cart</h1>
      <div>
        <div
          class="cart_drawer_items"
          v-for="cartDrawerItem in cartDrawerItems"
          :key="cartDrawerItem.id"
        >
          <span>{{ cartDrawerItem.name }}</span>
          <img
            :src="cartDrawerItem.url"
            :alt="cartDrawerItem.name"
            width="40"
          />
          <span>{{ cartDrawerItem.price }}</span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CartDrawer",
  props: ["cartDrawerItems"],
});
</script>

<style scoped>
.cart_drawer_items {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
}

.cart_drawer {
  height: 100%;
  width: 20%;
  background-color: blueviolet;
  position: fixed;
  top: 78px;
  right: 0px;
  animation: openDrawer 0.3s ease-in-out;
}

@keyframes openDrawer {
  to {
    width: 20%;
  }
  from {
    width: 0%;
  }
}

.cart_drawer_header {
  text-align: center;
  color: white;
}
</style>
