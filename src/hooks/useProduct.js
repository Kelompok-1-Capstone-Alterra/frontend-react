import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

const useProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

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
  };
};

export default useProduct;
