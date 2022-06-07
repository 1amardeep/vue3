<template>
  <form @submit.prevent="formSubmit">
    <h3>Fill the details for Sign Up</h3>
    <label for="name">Name :</label>
    <input type="text" v-model="name" name="name" id="name" required />
    <label for="email">Email :</label>
    <input type="email" v-model="email" name="email" id="email" required />
    <label for="password">Password :</label>
    <input
      type="password"
      v-model="password"
      name="password"
      id="password"
      required
    />
    <div class="submit">
      <button>Sign Up</button>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
  </form>
</template>

<script>
import useSignUp from "@/composables/authAPI";
import { ref } from "vue";

export default {
  name: "SignUp",
  setup(props, context) {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const { error, signUp } = useSignUp();

    const formSubmit = async () => {
      const res = await signUp(email.value, password.value, name.value);
      if (res) {
        console.log(res);
        console.log(res.user.displayName);
        context.emit("home");
      }
    };

    return {
      name,
      email,
      password,
      formSubmit,
      error,
    };
  },
};
</script>

<style scoped>
li {
  list-style: none;
  padding: 8px;
  display: inline-block;
  background: #cec6c6;
  border-radius: 16px;
  cursor: pointer;
  margin: 10px 0px 0px 10px;
}

.submit {
  text-align: center;
}
</style>
