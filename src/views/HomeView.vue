<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/cart_shopping.jpg" />
    <HelloWorld msg="Welcome to Online Cart" />
    <button @click="showhideModal">Add Item</button>
    <teleport to="#modal" v-if="showModal">
      <ModalWindow @close="showhideModal">
        <AddCartView>
          <button class="right" @click="showhideModal">Cancel</button>
        </AddCartView>
      </ModalWindow>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalWindow from "@/components/ModalWindow.vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import AddCartView from "@/views/AddCartView.vue";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      header: "Add Cart",
      description: "Add Description",
      showModal: false,
    };
  },
  components: {
    HelloWorld,
    ModalWindow,
    AddCartView,
  },
  methods: {
    showhideModal() {
      this.showModal = !this.showModal;
    },
  },
});
</script>
