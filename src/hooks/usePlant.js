import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const usePlant = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deletePlant = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/plants/${id}/detail`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  const createPlant = async (body) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/plants/add`,
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

  const updatePlant = async (id, body) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/plants/${id}/detail`,
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
    deletePlant,
    createPlant,
    updatePlant,
  };
};

export default usePlant;
