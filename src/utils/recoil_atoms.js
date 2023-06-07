import { atom } from "recoil";

export const addPlantDataState = atom({
  key: "addPlantData",
  default: {
    plant_name: "",
    plant_latin: "",
    plant_description: "",
    plant_pictures: null,
    watering_info: {
      watering_period: "",
      watering_pictures: null,
      watering_description: "",
    },
    temperature_info: {
      temperature_description: "",
      temperature_pictures: null,
    },
    fertilizing_info: {
      fertilizing_limit: "",
      fertilizing_period: "",
      fertilizing_pictures: null,
      fertilizing_description: "",
    },
    planting_info: {
      planting_container: false,
      planting_ground: false,
      container_info: {
        container_instruction: "",
        container_materials: "",
        container_video: "",
        container_pictures: null,
      },
      ground_info: {
        ground_instruction: "",
        ground_materials: "",
        ground_video: "",
        ground_pictures: null,
      },
    },
  },
});
