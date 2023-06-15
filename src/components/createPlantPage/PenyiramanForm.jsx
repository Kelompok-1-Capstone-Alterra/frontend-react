import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import ReactQuill from "react-quill";
import { Info12Regular } from "@fluentui/react-icons";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useRecoilValue } from "recoil";

import MySelect from "../MySelect";
import { MODULES } from "../../constants";
import FileInput from "../FileInput";
import { addPlantDataState } from "../../utils/recoil_atoms";
import { iterateConvertFileToBase64 } from "../../utils/functions";

const wateringPeriodOptions = [
  { value: 1, label: "1 kali sehari" },
  { value: 2, label: "2 kali sehari" },
];

const PenyiramanForm = forwardRef(function PenyiramanForm(
  { formId, onSubmit },
  ref
) {
  const addPlantData = useRecoilValue(addPlantDataState);

  const wateringPeriodDefaultOption =
    wateringPeriodOptions.find(
      (option) => option.value === addPlantData?.watering_info?.watering_period
    ) || addPlantData?.watering_info?.watering_period;

  const [editorFocus, setEditorFocus] = useState(false);
  const {
    register,
    setValue,
    trigger,
    watch,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...addPlantData,
      watering_info: {
        ...addPlantData.watering_info,
        watering_period: wateringPeriodDefaultOption,
      },
    },
  });

  useEffect(() => {
    register("watering_info.watering_description", {
      required: "Wajib diisi",
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onWateringDescriptionStateChange = (state) => {
    setValue("watering_info.watering_description", state);
    trigger("watering_info.watering_description");
  };

  let wateringDescriptionContent = watch("watering_info.watering_description");

  useImperativeHandle(ref, () => {
    return {
      getFormValues: async () => {
        const formValues = getValues();

        const newFormValues = await iterateConvertFileToBase64(formValues);

        return newFormValues;
      },
    };
  });

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-10">
        <div>
          <label
            htmlFor="wateringTimeSelect"
            className="text-body-sm font-semibold"
          >
            Pilih penyiraman
          </label>
          <Controller
            render={({ field }) => (
              <MySelect
                id="wateringTimeSelect"
                autoFocus
                errors={errors.watering_info?.watering_period}
                field={field}
                options={wateringPeriodOptions}
                placeholder="Pilih penyiraman"
                className="max-w-[421px] mt-1"
              />
            )}
            name="watering_info.watering_period"
            control={control}
            defaultValue=""
            defaultInputValue={addPlantData?.watering_info?.watering_period}
            rules={{
              required: "Waktu penyiraman tidak boleh kosong",
            }}
          />
          {errors.watering_info?.watering_period && (
            <p className="text-error text-caption-lg mt-1">
              <Info12Regular className="-mt-0.5" />{" "}
              {errors.watering_info?.watering_period?.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="wateringDescriptionField"
            className="text-body-sm font-semibold"
          >
            Deskripsi informasi penyiraman
          </label>
          <ReactQuill
            id="wateringDescriptionField"
            theme="snow"
            placeholder="Masukkan deskripsi informasi penyiraman tanaman"
            value={wateringDescriptionContent}
            onChange={onWateringDescriptionStateChange}
            modules={MODULES}
            className={`h-[306px] mt-1 ${
              editorFocus && !errors.watering_info?.watering_description
                ? "ql-focus"
                : null
            } ${
              errors.watering_info?.watering_description ? "ql-error" : null
            }`}
            onFocus={() => {
              setEditorFocus(true);
            }}
            onBlur={() => {
              setEditorFocus(false);
            }}
          />
          <div className="mt-12"></div>
          {errors.watering_info?.watering_description && (
            <p
              className="text-error text-caption-lg"
              id="error-image-message"
            >
              <Info12Regular className="-mt-0.5" /> Deskripsi tidak boleh kosong
            </p>
          )}
        </div>
        <FileInput
          id="wateringImageField"
          label={"Gambar Informasi Penyiraman"}
          value={useWatch({
            name: "watering_info.watering_pictures",
            control: control,
          })}
          rules={{
            required: true,
            shouldUnregister: true,
            validate: {
              lessThan1MB: (file) => file.size < 1000000,
              acceptedFormats: (file) =>
                ["image/jpeg", "image/png", "image/jpg"].includes(file?.type),
            },
          }}
          control={control}
          name="watering_info.watering_pictures"
          message={
            <span>
              <Info12Regular className="me-1.5" />
              Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
            </span>
          }
          isError={errors.watering_info?.watering_pictures}
        />
      </div>
    </form>
  );
});

export default PenyiramanForm;
