// number to currency rupiah
export const toRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const handleImagesUpload = async (images, uploadImage) => {
  const imageUrls = {};

  for (let key in images) {
    if (!images[key]) continue;

    const formData = new FormData();
    formData.append("pictures", images[key]);

    const response = await uploadImage(formData);

    if (response.status !== 200) throw new Error(response.data.message);

    imageUrls[key] = response.data.urls[0];
  }

  return imageUrls;
};

export const generatePlantSubmitData = (data, imageUrls) => {
  const newData = {
    ...data,
    plant_pictures: [{ url: imageUrls.plant_pictures }],
    planting_info: {
      ...data.planting_info,
      container_info: {
        ...data.planting_info.container_info,
        container_pictures: imageUrls.container_pictures
          ? [
              {
                url: imageUrls?.container_pictures,
              },
            ]
          : null,
      },
      ground_info: {
        ...data.planting_info.ground_info,
        ground_pictures: imageUrls.ground_pictures
          ? [{ url: imageUrls?.ground_pictures }]
          : null,
      },
    },
    fertilizing_info: {
      ...data.fertilizing_info,
      fertilizing_limit: data.fertilizing_info.fertilizing_limit.value,
      fertilizing_period: data.fertilizing_info.fertilizing_period.value,
      fertilizing_pictures: [{ url: imageUrls.fertilizing_pictures }],
    },
    watering_info: {
      ...data.watering_info,
      watering_period: data.watering_info.watering_period.value,
      watering_pictures: [{ url: imageUrls.watering_pictures }],
    },
    temperature_info: {
      ...data.temperature_info,
      temperature_pictures: [{ url: imageUrls.temperature_pictures }],
    },
  };

  if (data.my_plant) delete newData.my_plant;

  return newData;
};
