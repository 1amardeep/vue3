import { ref } from "vue";
import cartAPI from "./cartAPI";

const {
  getCart,
  updateCartSelected,
  showSpinner,
  getCartById,
  postCartToDB,
  deleteCartToDB,
} = cartAPI();

function cartCrudOperation() {
  const cartItems = ref([]);
  const cartDrawerItems = ref([]);

  const selected = (cart) => {
    updateCartSelected(
      cart.id,
      JSON.stringify({ selected: !cart.selected })
    ).then(() => {
      cart.selected = !cart.selected;
      cartDrawerItems.value = cartItems.value.filter((cartItem) => {
        return cartItem.selected;
      });
    });
  };

  const getCartData = async () => {
    cartItems.value = await getCart();
  };

  const getCartByIdAPI = async (id) => {
    return await getCartById(id);
  };

  const postCart = async (body) => {
    return await postCartToDB(body);
  };

  const deleteCartCrud = async (id) => {
    return await deleteCartToDB(id);
  };

  return {
    showSpinner,
    cartItems,
    getCartData,
    cartDrawerItems,
    selected,
    getCartByIdAPI,
    postCart,
    deleteCartCrud,
  };
}

export default cartCrudOperation;
