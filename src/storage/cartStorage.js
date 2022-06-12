import { defineStore } from "pinia";
import cartAPI from "@/composables/cartAPI";
const { getCart, showSpinner } = cartAPI();

export const cartStore = defineStore("cart", {
  state: () => {
    return {
      cartItems: [],
      showSpinner: showSpinner,
      itemInCart: [],
      cartItemsClone: [],
    };
  },
  getters: {
    gettersCartItems: (state) => state.cartItems,
  },
  actions: {
    async getCartData() {
      this.cartItems = await getCart();
      this.cartItemsClone = this.cartItems.map((obj) => {
        obj.count = 0;
        return obj;
      });
    },
    addItemToCart(item) {
      const _matchCart = this.itemInCart.filter((obj) => obj.id === item.id);
      if (_matchCart.length === 0) {
        this.itemInCart.push({ ...item, count: 1 });
      } else {
        this.itemInCart.map((obj) => {
          if (obj.id === item.id) {
            obj.count = obj.count + 1;
          }
          return obj;
        });
      }
      this.cartItemsClone.map((obj) => {
        if (obj.id === item.id) {
          obj.count = obj.count + 1;
        }
        return obj;
      });
    },
    removeItemFromCart(item) {
      this.itemInCart.map((obj) => {
        if (obj.id === item.id) {
          obj.count--;
        }
        return obj;
      });

      let idx = this.itemInCart.findIndex((data) => data.count === 0);
      if (idx !== -1) this.itemInCart.splice(idx, 1);

      this.cartItemsClone.map((obj) => {
        if (obj.id === item.id) {
          obj.count = obj.count - 1;
        }
        return obj;
      });
    },
  },
});
