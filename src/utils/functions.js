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
  const imagePromises = Object.entries(images).map(async ([key, image]) => {
    if (!image) {
      return null;
    }

    const formData = new FormData();
    formData.append("pictures", image);

    const response = await uploadImage(formData);
    if (response.status !== 200) {
      throw new Error(`Failed to get image for ${key}: ${response.statusText}`);
    }

    return [key, response.data.urls[0]];
  });
  const imageResults = await Promise.all(imagePromises);
  // Filter out null values and turn array of arrays into object
  const imageUrls = Object.fromEntries(imageResults.filter(Boolean));

  return imageUrls;
};

// export const handleImagesUpload = async (images, uploadImage) => {
//   const imageUrls = {};

//   for (let key in images) {
//     if (!images[key]) continue;

//     const formData = new FormData();
//     formData.append("pictures", images[key]);

//     const response = await uploadImage(formData);

//     if (response.status !== 200) throw new Error(response.data.message);

//     imageUrls[key] = response.data.urls[0];
//   }

//   return imageUrls;
// };

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

// Function from https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    type = mime.split("/")[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${type}`, { type: mime });
}

// Function inspired from https://stackoverflow.com/questions/8085004/iterate-through-nested-javascript-objects
export const iterateConvertFileToBase64 = async (obj) => {
  const newObj = {
    ...obj,
    planting_info: {
      ...obj.planting_info,
      container_info: { ...obj.planting_info.container_info },
      ground_info: { ...obj.planting_info.ground_info },
    },
    fertilizing_info: { ...obj.fertilizing_info },
    watering_info: { ...obj.watering_info },
    temperature_info: { ...obj.temperature_info },
  };

  const stack = [newObj];
  while (stack?.length > 0) {
    const currentObj = stack.pop();

    for (let key in currentObj) {
      if (key.includes("pictures") && currentObj[key] instanceof File) {
        currentObj[key] = await toBase64(currentObj[key]);
      }
      if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
        stack.push(currentObj[key]);
      }
    }
  }
  return newObj;
};

export const iterateConvertBase64ToFile = (obj) => {
  const stack = [obj];
  while (stack?.length > 0) {
    const currentObj = stack.pop();
    Object.keys(currentObj).forEach((key) => {
      if (
        key.includes("pictures") &&
        currentObj[key] !== null &&
        typeof currentObj[key] === "string"
      ) {
        currentObj[key] = dataURLtoFile(currentObj[key], key);
        console.log(key, currentObj[key]);
      }

      if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
        stack.push(currentObj[key]);
      }
    });
  }
};
