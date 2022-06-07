<template>
  <SignUp @home="homeRedirect" v-if="showSignup" />
  <LoginUp @home="homeRedirect" v-else />
  <p v-if="showSignup">
    Already Registered ? Please Click on
    <span class="link" @click="toggleSignUpLogin">Login</span>.
  </p>
  <p v-else>
    Not Registered ? Please Click on
    <span class="link" @click="toggleSignUpLogin">Sign Up</span>.
  </p>
</template>

<script>
import SignUp from "@/components/SignUp.vue";
import LoginUp from "@/components/LoginUp.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "SignUpView",
  components: {
    SignUp,
    LoginUp,
  },
  setup() {
    const showSignup = ref(true);
    const toggleSignUpLogin = () => {
      showSignup.value = !showSignup.value;
    };
    const router = useRouter();
    const homeRedirect = () => {
      router.push({ name: "home" });
    };
    return {
      showSignup,
      toggleSignUpLogin,
      homeRedirect,
    };
  },
};
</script>

<style scoped>
.link {
  font-weight: bold;
  cursor: pointer;
}
</style>
