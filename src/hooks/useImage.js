import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const useImage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
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

  const getImage = async (imageUrl) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}/pictures/${imageUrl}`,
        {
          responseType: "blob",
        }
      );
      return res;
    } catch (err) {
      return err.response;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteImage = async (imageUrl) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.delete(
        `${import.meta.env.VITE_API_BASE_URL}/pictures/${imageUrl}`
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
    deleteImage,
    getImage,
    isLoading,
  };
};

export default useImage;
