import { useState } from "react";
import { SaveRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

import Button from "../components/Button";
import useMultistepForm from "../hooks/useMultistepForm";
import Step from "../components/Step";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import DetailTanamanForm from "../components/createPlantPage/DetailTanamanForm";
import PenanamanForm from "../components/createPlantPage/PenanamanForm";
import PemupukkanForm from "../components/createPlantPage/PemupukkanForm";
import PenyiramanForm from "../components/createPlantPage/PenyiramanForm";
import TemperaturForm from "../components/createPlantPage/TemperaturForm";
import { addPlantDataState } from "../utils/recoil_atoms";
import { ConfirmModal, NotifModal } from "../components/Modal";
import usePlant from "../hooks/usePlant";
import useImage from "../hooks/useImage";

export default function CreatePlantPage() {
  const [addPlantData, setAddPlantData] = useRecoilState(addPlantDataState);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [notifModal, setNotifModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const resetAddPlantData = useResetRecoilState(addPlantDataState);
  const navigate = useNavigate();
  const { createPlant } = usePlant();
  const { uploadImage } = useImage();

  async function onSubmit(data) {
    console.log(data);

    setAddPlantData((prevData) => ({
      ...prevData,
      ...data,
    }));

    if (isLastStep) {
      setIsConfirmModalOpen(true);
    }

    handleNextStep();
  }

  const handleImagesUpload = async (images) => {
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

      const imageUrls = await handleImagesUpload(images);

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

      const response = await createPlant(newData);

      if (response.status !== 200) throw new Error(response.data.message);

      setNotifModal({
        show: true,
        icon: "success",
        text: "Data tambah tanaman kamu berhasil disimpan",
        title: "Tambah Tanaman",
      });
    } catch (error) {
      setNotifModal({
        show: true,
        icon: "info",
        text: "Data tanaman kamu gagal ditambahkan",
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

  return (
    <SecondaryContainer
      title="Tambah Tanaman"
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
        title={"Informasi Simpan Data Tanaman"}
        text={"Kamu yakin ingin menyimpan data tanaman ini?"}
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
