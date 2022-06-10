<template>
  <div class="about">
    <h3>{{ title }}</h3>
    <form @submit.prevent="formSubmit">
      <label for="name">Name :</label>
      <input type="text" v-model="name" name="name" id="name" required />
      <hr />
      <label for="imageUpload">Upload :</label>
      <input
        type="file"
        name="imageUpload"
        id="imageUpload"
        @change="handleChange"
      />
      <div class="error" style="clear: right">{{ fileError }}</div>
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
import useStorage from "@/composables/useStorage";

export default {
  name: "AddCartView",
  setup() {
    const title = ref("Add Items");
    const name = ref("");
    const url = ref("");
    const price = ref(0);
    const tag = ref("");
    const file = ref(null);
    const selected = ref(true);
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const fileError = ref(null);

    const { postCart } = cartCrudOperation();
    const router = useRouter();
    const { imageUrl, error, uploadImage } = useStorage();

    const formSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value);
        await postCart({
          name: name.value,
          url: imageUrl.value,
          price: price.value,
          selected: selected.value,
          tag: tag.value,
        });
        if (!error.value) {
          router.push({ name: "cartitems" });
        }
      }
    };

    const handleChange = (e) => {
      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select the image file";
      }
    };

    return {
      title,
      name,
      url,
      price,
      selected,
      tag,
      formSubmit,
      handleChange,
      fileError,
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
