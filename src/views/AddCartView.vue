<template>
  <div class="about">
    <h3>{{ title }}</h3>
    <form @submit.prevent="formSubmit">
      <label for="name">Name :</label>
      <input type="text" v-model="name" name="name" id="name" required />
      <hr />
      <label for="url">Url :</label>
      <input type="text" v-model="url" name="url" id="url" required />
      <hr />
      <label for="price">Price :</label>
      <input type="number" v-model="price" name="price" id="price" required />
      <hr />
      <label for="tag">Tag :</label>
      <input type="text" v-model="tag" name="tag" id="tag" required />
      <hr />
      <div>
        <input
          type="checkbox"
          v-model="selected"
          name="selected"
          id="selected"
        />
        <label for="selected">Selected</label>
      </div>
      <div class="submit">
        <button class="btn">Add to DB</button>
        <slot />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import cartCrudOperation from "@/composables/cartCrudOperation";
import { useRouter } from "vue-router";

export default {
  name: "AddCartView",
  setup() {
    const title = ref("Add Items");
    const name = ref("");
    const url = ref("");
    const price = ref(0);
    const tag = ref("");
    const selected = ref(true);

    const { postCart } = cartCrudOperation();
    const router = useRouter();

    const formSubmit = () => {
      postCart({
        name: name.value,
        url: url.value,
        price: price.value,
        selected: selected.value,
        tag: tag.value,
      });
      router.push({ name: "cartitems" });
    };
    return {
      title,
      name,
      url,
      price,
      selected,
      tag,
      formSubmit,
    };
  },
};
</script>

<style scoped>
input {
  width: 75%;
  border-radius: 15px;
  float: right;
}

hr {
  clear: both;
}

form {
  max-width: 286px;
  margin: 0 auto;
  text-align: left;
  border-radius: 10px;
  padding: 12px;
  background: #ddd;
}

label {
  margin: 10px 0 10px 0;
  font-size: 1rem;
}
</style>
