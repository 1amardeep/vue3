import { projectStorage } from "../firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const imageUrl = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);
    try {
      const res = await storageRef.put(file);
      imageUrl.value = await res.ref.getDownloadURL();
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    imageUrl,
    filePath,
    error,
    uploadImage,
  };
};

export default useStorage;
