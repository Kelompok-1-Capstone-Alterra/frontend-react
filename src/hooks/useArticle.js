import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

const useArticle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteArticle = async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/articles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
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

  const createArticle = async (body) => {
    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/articles/add`,
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

  const updateArticle = async (id, body) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/articles/${id}`,
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
    deleteArticle,
    createArticle,
    updateArticle,
  };
};

export default useArticle;
