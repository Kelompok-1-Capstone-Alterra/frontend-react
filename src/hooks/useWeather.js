import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useWeather = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteWeather = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/weathers/${id}`,{
            headers: {
              "Content-Type": "application/json",
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

  const createWeather = async (body) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/weathers/add`,
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
    deleteWeather,
    createWeather,
  };
};

export default useWeather;
