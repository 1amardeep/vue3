<template>
  <nav class="nav_bar">
    <img
      class="company_logo"
      alt="company logo"
      src="assets/company_logo.png"
      @click="home"
    />
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'cartitems' }">Cart Items</router-link>
    <div>
      <div v-if="isLoggedIn">
        <div class="displayName">Welcome !! {{ user?.displayName }}</div>
        <a class="loglogin" @click="logoutFn">Logout</a>
      </div>
      <router-link v-else class="signUp" to="/signup">Sign Up</router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { useRouter } from "vue-router";
import useLogout from "@/composables/logoutAPI";
import getUser from "@/composables/getUser";
import { computed } from "vue";

export default {
  setup() {
    const router = useRouter();
    const { error, logout } = useLogout();
    const { user } = getUser();

    const isLoggedIn = computed(() => {
      return !!user.value;
    });

    const home = () => {
      router.push({ name: "home" });
    };
    const logoutFn = async () => {
      console.log("hti");
      await logout();
      if (!error.value) {
        router.push({ name: "SignUpView" });
        console.log("logout sucessfull");
      }
    };
    return {
      home,
      logoutFn,
      error,
      isLoggedIn,
      user,
    };
  },
};
</script>

<style scoped>
nav {
  padding: 30px 0px;
  background: black;
  position: sticky;
  width: 100%;
  z-index: 1;
  top: 0px;
}

nav a {
  font-weight: bold;
  color: #fff;
  padding: 12px;
  text-decoration-line: none;
  border-radius: 10px;
}

nav a.router-link-exact-active {
  color: #ffffff;
  text-decoration-line: none;
  background: blue;
}

.company_logo {
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 17px;
  left: 15px;
  transform: rotate(180deg);
}

.loglogin {
  position: absolute;
  top: 30px;
  right: 17px;
  cursor: pointer;
}

.signUp {
  position: absolute;
  top: 20px;
  right: 17px;
  cursor: pointer;
}

.displayName {
  position: absolute;
  color: white;
  right: 20px;
  top: 24px;
}
</style>
