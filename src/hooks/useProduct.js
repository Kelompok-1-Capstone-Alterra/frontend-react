import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";
import useImage from "./useImage";

const useProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteImage } = useImage();

  const deleteProduct = async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProductImage = async (id) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/auth/admins/products/${id}/detail`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const images = res.data.data.product_pictures;
      const imagesPromises = images.map(async (image) => {
        return await deleteImage(image);
      });
      const responses = await Promise.all(imagesPromises);
      return responses;
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (body) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/products/add`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return res;
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id, body) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/products/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      return res;
    } catch (error) {
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    deleteProduct,
    createProduct,
    updateProduct,
    deleteProductImage,
  };
};

export default useProduct;
