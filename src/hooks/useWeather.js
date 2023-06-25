import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";

const useWeather = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteWeather = async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/weathers/${id}`,
        {
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
  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/weathers`,
        {
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
      const res = await axiosInstance.post(
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
  const updateWeather = async (id, body) => {
    try {
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/weathers/${id}`,
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
    updateWeather,
    fetchWeather,
  };
};

export default useWeather;
