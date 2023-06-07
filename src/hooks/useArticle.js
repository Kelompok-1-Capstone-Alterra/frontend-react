import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useArticle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteArticle = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/articles/${id}`
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
      const res = await axios.post(
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

  return {
    isLoading,
    deleteArticle,
    createArticle,
  };
};

export default useArticle;
