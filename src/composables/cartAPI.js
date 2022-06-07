import { projectFirestore, timeStamp } from "../firebase/config";
import { ref } from "vue";

export default function cartAPI() {
  const showSpinner = ref(false);

  const getCart = async () => {
    showSpinner.value = true;
    try {
      const res = await projectFirestore
        .collection("cartItems")
        .orderBy("createdAt")
        .get();
      return res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    } catch (err) {
      console.log(err);
    } finally {
      showSpinner.value = false;
    }
  };

  const getCartById = async (id) => {
    showSpinner.value = true;
    try {
      const res = await projectFirestore.collection("cartItems").doc(id).get();
      return { ...res.data(), id };
    } catch (err) {
      console.log(err);
    } finally {
      showSpinner.value = false;
    }
  };

  const postCartToDB = async (body) => {
    try {
      const res = await projectFirestore
        .collection("cartItems")
        .add({ ...body, createdAt: timeStamp() });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCartToDB = async (id) => {
    try {
      const res = await projectFirestore
        .collection("cartItems")
        .doc(id)
        .delete();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCartSelected = async (id, body) => {
    return fetch("http://localhost:3000/cartItems/" + id, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body,
    });
  };

  return {
    getCart,
    getCartById,
    updateCartSelected,
    showSpinner,
    postCartToDB,
    deleteCartToDB,
  };
}
