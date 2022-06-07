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
    <router-link class="loglogin" to="/signup">Sign Up</router-link>
    <!-- <a class="loglogin">Logout</a> -->
  </nav>
  <!-- <button class="btn" >
    <span class="material-icons"> home </span>
  </button> -->
  <router-view />
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const home = () => {
      router.push({ name: "home" });
    };
    return {
      home,
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
  top: 17px;
  right: 17px;
  cursor: pointer;
}
</style>
