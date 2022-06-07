import { projectAuth } from "../firebase/config";
import { ref } from "vue";

const error = ref(null);

const signUp = async (email, pwd, name) => {
  error.value = null;
  try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, pwd);
    if (!res) {
      throw Error("Sign Up Issue");
    }
    await res.user.updateProfile({ displayName: name });
    return res;
  } catch (err) {
    error.value = err.message;
  }
};

const useSignUp = () => {
  return { error, signUp };
};

export default useSignUp;
