import { useState } from "react";
import axios from "axios";

const useImages = () => {
  const [loading, setLoading] = useState(true);

  const uploadImage = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/pictures`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res;
    } catch (err) {
      return err.response;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImage,
    loading,
  };
};

export default useImages;
