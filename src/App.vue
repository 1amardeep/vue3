<template>
  <nav class="nav_bar">
    <div class="nav_bar_menu">
      <div class="nav_bar_menu_column1">
        <img
          class="company_logo"
          alt="company logo"
          src="assets/company_logo.png"
          @click="home"
        />
        <router-link v-if="isLoggedIn" :to="{ name: 'home' }">Home</router-link>
        <router-link v-if="isLoggedIn" :to="{ name: 'cartitems' }"
          >Cart Items</router-link
        >
      </div>
      <div class="nav_bar_menu_column2">
        <div v-if="isLoggedIn">
          <button class="btn shopping_cart_btn">
            <span class="material-icons"> shopping_cart </span>
            <span> {{ itemInCart.length }} </span>
          </button>
          <div class="displayName">
            <span class="hide"> Welcome !!</span> {{ user?.displayName }}
          </div>
          <a class="loglogin" @click="logoutFn">Logout</a>
        </div>
        <router-link v-else class="signUp" to="/signup">Sign Up</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { useRouter } from "vue-router";
import useLogout from "@/composables/logoutAPI";
import getUser from "@/composables/getUser";
import { computed } from "vue";
import { cartStore } from "@/storage/cartStorage";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const router = useRouter();
    const { error, logout } = useLogout();
    const { user } = getUser();
    const cartStorage = cartStore();
    const { itemInCart } = storeToRefs(cartStorage);

    const isLoggedIn = computed(() => {
      return !!user.value;
    });

    const home = () => {
      router.push({ name: "home" });
    };
    const logoutFn = async () => {
      await logout();
      if (!error.value) {
        router.push({ name: "SignUpView" });
      }
    };
    return {
      home,
      logoutFn,
      error,
      isLoggedIn,
      user,
      itemInCart,
    };
  },
};
</script>

<style scoped>
nav {
  padding: 30px 0px 17px 0px;
  background: black;
  position: sticky;
  width: 100%;
  z-index: 1;
  top: 0px;
  height: 20px;
}

.nav_bar_menu {
  display: grid;
  grid-template-columns: auto auto auto;
}

.nav_bar_menu_column1 {
  grid-column-start: 1;
  grid-column-end: 3;
}

.shopping_cart_btn {
  margin-top: -9px;
  padding: 7px;
  border-radius: 10px;
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
  top: 10px;
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
  top: 15px;
  right: 17px;
  cursor: pointer;
}

.displayName {
  position: absolute;
  color: white;
  right: 20px;
  top: 24px;
}

@media screen and (max-width: 600px) {
  .hide {
    display: none;
  }
}
</style>
