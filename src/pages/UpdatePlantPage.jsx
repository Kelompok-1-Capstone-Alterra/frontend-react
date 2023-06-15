import { useState, useEffect } from "react";
import { SaveRegular } from "@fluentui/react-icons";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
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
import {} from "react-router-dom";
import fetcher from "../utils/fetcher";

export default function UpdatePlantPage() {
  const param = useParams();
  console.log(param.id);
  const { data } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admins/plants/${
      param.id
    }/detail`,
    (url) => fetcher(url, Cookies.get("token"))
  );
  const plant = data?.data;
  const [addPlantData, setAddPlantData] = useRecoilState(addPlantDataState);
  const resetAddPlantData = useResetRecoilState(addPlantDataState);
  const navigate = useNavigate();
  const { updatePlant } = usePlant();
  const location = useLocation();
  const { uploadImage } = useImage();
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

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/pictures/${imageUrls[key]}`,
        {
          responseType: "blob",
        }
      );
      const file = new File([response.data], imageUrls[key], {
        type: response.data.type,
      });

      images[key] = file;
    }
    return images;
  };

  useEffect(() => {
    if (plant) {
      console.log("test");
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

      getPlantImages(imageUrls).then((images) => {
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

  return (
    <SecondaryContainer
      title="Edit Tanaman"
      backTo="/admin/plants"
    >
      <Step
        steps={steps}
        activeStepIndex={activeStepIndex}
      />
      <div className="flex justify-end gap-5 mt-11 items-stretch">
        <Button
          id="saveDraftButton"
          size="md"
          type="Button"
          variant="text"
          className="px-[10.5px] flex items-center gap-1.5"
        >
          Simpan draf <SaveRegular className="text-[22px] -mt-1" />
        </Button>
        {!isFirstStep && (
          <Button
            id="previousStepButton"
            onClick={handlePreviousStep}
            size="md"
            type="button"
          >
            Kembali
          </Button>
        )}
        <Button
          id="nextStepButton"
          size="md"
          type="submit"
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
    </SecondaryContainer>
  );
}
