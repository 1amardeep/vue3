<template>
  <form @submit.prevent="formSubmit">
    <h3>Fill the details for Login</h3>
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
      <button>Log In</button>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
  </form>
</template>

<script>
import useLogin from "@/composables/loginAPI";
import { ref } from "vue";
export default {
  name: "LoginUp",
  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const { error, login } = useLogin();

    const formSubmit = async () => {
      const res = await login(email.value, password.value);
      if (res) {
        context.emit("home");
      }
    };

    return {
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
