import { useState } from "react";
import axios from "axios";

const useImage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (formData) => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return {
    uploadImage,
    isLoading,
  };
};

export default useImage;
