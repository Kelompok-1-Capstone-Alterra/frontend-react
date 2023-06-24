import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";
import useImage from "./useImage";

const usePlant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteImage } = useImage();

  const deletePlant = async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(
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
      const res = await axiosInstance.post(
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
      const res = await axiosInstance.put(
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

  const deletePlantImage = async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/plants/${id}/detail`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const plant = response.data.data;


      const imageUrls = {
        plant_pictures: plant.plant_pictures[0].url,
        container_pictures: plant.planting_info?.container_info?.container_pictures?.[0]?.url,
        ground_pictures: plant.planting_info?.ground_info?.ground_pictures?.[0]?.url,
        fertilizing_pictures: plant.fertilizing_info.fertilizing_pictures[0].url,
        watering_pictures: plant.watering_info.watering_pictures[0].url,
        temperature_pictures: plant.temperature_info.temperature_pictures[0].url,
      }

      const imagePromises = Object.entries(imageUrls).map(([key, url]) => {
        if (!url) return;

        return deleteImage(url, key);
      }
      )

      return await Promise.all(imagePromises);
    } catch (error) {
      console.log(error);
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
    deletePlantImage
  };
};

export default usePlant;
