import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import Cookies from "js-cookie";
import useSWR from "swr";

import Button from "../components/Button";
import { ConfirmModal, NotifModal } from "../components/Modal";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import Step from "../components/Step";
import TemperaturForm from "../components/createPlantPage/TemperaturForm";
import PenyiramanForm from "../components/createPlantPage/PenyiramanForm";
import PemupukkanForm from "../components/createPlantPage/PemupukkanForm";
import PenanamanForm from "../components/createPlantPage/PenanamanForm";
import DetailTanamanForm from "../components/createPlantPage/DetailTanamanForm";
import useMultistepForm from "../hooks/useMultistepForm";
import { addPlantDataState } from "../utils/recoil_atoms";
import {
  generatePlantSubmitData,
  handleImagesUpload,
} from "../utils/functions";
import usePlant from "../hooks/usePlant";
import useImage from "../hooks/useImage";
import fetcher from "../utils/fetcher";
import Loading from "../components/Loading";

export default function UpdatePlantPage() {
  const param = useParams();
  const [imageLoading, setImageLoading] = useState(true);

  const { data, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admins/plants/${
      param.id
    }/detail`,
    (url) => fetcher(url, Cookies.get("token"))
  );
  const plant = data?.data;
  const [addPlantData, setAddPlantData] = useRecoilState(addPlantDataState);
  const resetAddPlantData = useResetRecoilState(addPlantDataState);
  const navigate = useNavigate();
  const { updatePlant, isLoading: isSaving } = usePlant();
  const { uploadImage, getImage, isLoading: isUploading } = useImage();
  const location = useLocation();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [notifModal, setNotifModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });

  const getPlantImages = async (imageUrls) => {
    const images = {};

    for (let key in imageUrls) {
      if (!imageUrls[key]) continue;

      const response = await getImage(imageUrls[key]);
      console.log(response);

      if (response.status !== 200)
        throw new Error(`Failed to get image, ${response.statusText}`);

      const fileSuffix = response.data.type.split("/")[1];
      const file = new File([response.data], `${key}.${fileSuffix}`, {
        type: response.data.type,
      });

      images[key] = file;
    }
    return images;
  };

  useEffect(() => {
    if (plant) {
      const imageUrls = {
        plant_pictures: plant?.plant_pictures?.[0]?.url,
        container_pictures:
          plant.planting_info?.container_info?.container_pictures?.[0]?.url,
        ground_pictures:
          plant.planting_info?.ground_info?.ground_pictures?.[0]?.url,
        fertilizing_pictures:
          plant.fertilizing_info.fertilizing_pictures?.[0]?.url,
        watering_pictures: plant.watering_info.watering_pictures?.[0]?.url,
        temperature_pictures:
          plant.temperature_info.temperature_pictures?.[0]?.url,
      };

      getPlantImages(imageUrls)
        .then((images) => {
          const completePlant = {
            ...plant,
            plant_pictures: images?.plant_pictures ?? null,
            planting_info: {
              ...plant.planting_info,
              container_info: {
                ...plant.planting_info.container_info,
                container_pictures: images?.container_pictures ?? null,
              },
              ground_info: {
                ...plant.planting_info.ground_info,
                ground_pictures: images?.ground_pictures ?? null,
              },
            },
            fertilizing_info: {
              ...plant.fertilizing_info,
              fertilizing_pictures: images?.fertilizing_pictures ?? null,
            },
            watering_info: {
              ...plant.watering_info,
              watering_pictures: images?.watering_pictures ?? null,
            },
            temperature_info: {
              ...plant.temperature_info,
              temperature_pictures: images?.temperature_pictures ?? null,
            },
          };
          setAddPlantData(completePlant);
          setImageLoading(false);
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    }
  }, [plant]);

  async function onSubmit(data) {
    setAddPlantData((prevData) => ({
      ...prevData,
      ...data,
    }));

    if (isLastStep) {
      setIsConfirmModalOpen(true);
    }

    handleNextStep();
  }

  const insertPlantData = async (data) => {
    try {
      const images = {
        plant_pictures: data.plant_pictures,
        container_pictures:
          data.planting_info?.container_info?.container_pictures,
        ground_pictures: data.planting_info?.ground_info?.ground_pictures,
        fertilizing_pictures: data.fertilizing_info.fertilizing_pictures,
        watering_pictures: data.watering_info.watering_pictures,
        temperature_pictures: data.temperature_info.temperature_pictures,
      };

      const imageUrls = await handleImagesUpload(images, uploadImage);

      const newData = generatePlantSubmitData(data, imageUrls);

      const response = await updatePlant(param.id, newData);

      if (response.status !== 200) throw new Error(response.data.message);

      setNotifModal({
        show: true,
        icon: "success",
        text: "Data tanaman berhasil diubah",
        title: "Ubah Data Tanaman",
      });
    } catch (error) {
      console.log(error);
      setNotifModal({
        show: true,
        icon: "info",
        text: "Data tanaman gagal diubah",
        title: "Aksi Gagal",
      });
    } finally {
      resetAddPlantData();
    }
  };

  const {
    steps,
    handleNextStep,
    handlePreviousStep,
    activeStepIndex,
    isFirstStep,
    isLastStep,
  } = useMultistepForm([
    {
      id: "detailTanaman",
      title: "Detail Tanaman",
      content: (
        <DetailTanamanForm
          formId={"form0"}
          onSubmit={onSubmit}
        />
      ),
    },
    {
      id: "penanaman",
      title: "Penanaman",
      content: (
        <PenanamanForm
          formId={"form1"}
          onSubmit={onSubmit}
        />
      ),
    },
    {
      id: "pemupukkan",
      title: "Pemupukkan",
      content: (
        <PemupukkanForm
          formId={"form2"}
          onSubmit={onSubmit}
        />
      ),
    },
    {
      id: "penyiraman",
      title: "Penyiraman",
      content: (
        <PenyiramanForm
          formId={"form3"}
          onSubmit={onSubmit}
        />
      ),
    },
    {
      id: "temperatur",
      title: "Temperatur",
      content: (
        <TemperaturForm
          formId={"form4"}
          onSubmit={onSubmit}
        />
      ),
    },
  ]);

  useEffect(() => {
    resetAddPlantData();
  }, [location]);

  if (isLoading || imageLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <SecondaryContainer
      title="Edit Tanaman"
      backTo="/admin/plants"
      className="overflow-scroll"
    >
      <Step
        steps={steps}
        activeStepIndex={activeStepIndex}
      />
      <div className="flex justify-end gap-5 mt-11 items-stretch">
        {!isFirstStep && (
          <Button
            id="previousStepButton"
            onClick={handlePreviousStep}
            size="md"
            disabled={isSaving || isUploading}
            isLoading={isSaving || isUploading}
            type="button"
          >
            Kembali
          </Button>
        )}
        <Button
          id="nextStepButton"
          size="md"
          type="submit"
          disabled={isSaving || isUploading}
          form={`form${activeStepIndex}`}
        >
          {isLastStep ? "Simpan" : "Lanjut"}
        </Button>
      </div>
      <ConfirmModal
        cancelText={"Kembali"}
        title={"Informasi Ubah Data Tanaman"}
        text={"Kamu yakin ingin mengubah data tanaman ini?"}
        confirmText={"Simpan"}
        icon={"info"}
        isOpen={isConfirmModalOpen}
        onCancel={() => {
          setIsConfirmModalOpen(false);
        }}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          insertPlantData(addPlantData);
        }}
      />
      <NotifModal
        title={notifModal.title}
        text={notifModal.text}
        icon={notifModal.icon}
        confirmText={"Tutup"}
        isOpen={notifModal.show}
        onConfirm={() => {
          setNotifModal({
            show: false,
            icon: "",
            text: "",
            title: "",
          });
          navigate("/admin/plants");
        }}
      />
      <div
        className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
          isConfirmModalOpen || notifModal.show ? "block" : "hidden"
        } cursor-pointer top-0 bottom-0 left-0 right-0`}
      ></div>
    </SecondaryContainer>
  );
}
