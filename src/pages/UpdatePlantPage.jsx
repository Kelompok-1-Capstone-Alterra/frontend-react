import { SaveRegular } from "@fluentui/react-icons";
import Button from "../components/Button";
import { NotifModal } from "../components/Modal";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import Step from "../components/Step";
import TemperaturForm from "../components/createPlantPage/TemperaturForm";
import PenyiramanForm from "../components/createPlantPage/PenyiramanForm";
import PemupukkanForm from "../components/createPlantPage/PemupukkanForm";
import PenanamanForm from "../components/createPlantPage/PenanamanForm";
import DetailTanamanForm from "../components/createPlantPage/DetailTanamanForm";
import useMultistepForm from "../hooks/useMultistepForm";
import { addPlantDataState } from "../utils/recoil_atoms";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UpdatePlantPage() {
  const setAddPlantData = useSetRecoilState(addPlantDataState);
  const navigate = useNavigate();
  const [notifModal, setNotifModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });

  async function onSubmit(data) {
    console.log(data);

    setAddPlantData((prevData) => ({
      ...prevData,
      ...data,
    }));

    if (isLastStep) {
      insertPlantData(data);
    }

    handleNextStep();
  }

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

  const insertPlantData = async (data) => {
    console.log(data);
    // try {
    //   const response = await axios.post(
    //     "https://646df4e19c677e23218ab701.mockapi.io/plant",
    //     {
    //       ...data,
    //       fertilization: {
    //         ...data.fertilization,
    //         limit: data.fertilization.limit.value,
    //         period: data.fertilization.period.value,
    //       },
    //       watering: { ...data.watering, period: data.watering.period.value },
    //     }
    //   );

    //   if (response.status === 201) {
    //     setNotifModal({
    //       show: true,
    //       icon: "success",
    //       text: `Produk kamu berhasil ditambahkan ke ${
    //         data.status === "etalase" ? "etalase" : "arsip"
    //       }`,
    //       title: "Simpan Produk",
    //     });
    //   } else {
    //     setNotifModal({
    //       show: true,
    //       icon: "info",
    //       text: "Simpan Produk",
    //       title: "Produk Gagal Disimpan",
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

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
      <NotifModal
        title={notifModal.title}
        text={notifModal.text}
        icon={notifModal.icon}
        confirmText={"Kembali"}
        isOpen={notifModal.show}
        onConfirm={() => {
          setNotifModal({
            show: false,
            icon: "",
            text: "",
            title: "",
          });
          // setAddPlantData({});
          navigate("/admin/products");
        }}
      />
    </SecondaryContainer>
  );
}
