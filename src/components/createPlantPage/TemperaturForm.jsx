import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import ReactQuill from "react-quill";
import { Info12Regular } from "@fluentui/react-icons";
import { useForm, useWatch } from "react-hook-form";
import { useRecoilValue } from "recoil";

import { MODULES } from "../../constants";
import FileInput from "../FileInput";
import { addPlantDataState } from "../../utils/recoil_atoms";
import TextFieldGroup from "../TextFieldGroup";
import { iterateConvertFileToBase64 } from "../../utils/functions";
import useScrollToTop from "../../hooks/useScrollToTop";

const TemperaturForm = forwardRef(function TemperaturForm(
  { formId, onSubmit },
  ref
) {
  const addPlantData = useRecoilValue(addPlantDataState);
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
  } = useForm({ defaultValues: addPlantData });

  useEffect(() => {
    register("temperature_info.temperature_description", {
      required: "Wajib diisi",
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onTemperatureDescriptionStateChange = (state) => {
    setValue("temperature_info.temperature_description", state);
    trigger("temperature_info.temperature_description");
  };

  let temperatureDescriptionContent = watch(
    "temperature_info.temperature_description"
  );

  useScrollToTop();

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
            htmlFor="minTemperatureField"
            className="text-body-lg font-semibold"
          >
            Temperature Ideal
          </label>
          <div className="flex gap-5 justify-start max-w-[250px]">
            <TextFieldGroup
              id="minTemperatureField"
              autoFocus
              label={<span className="text-caption-lg">Suhu minimal</span>}
              placeholder="Min"
              autoComplete="off"
              name="temperature_info.temperature_min"
              type="number"
              isError={errors.temperature_info?.temperature_min}
              register={{
                ...register("temperature_info.temperature_min", {
                  required: "Temperatur tidak boleh kosong",
                  valueAsNumber: true,
                }),
              }}
              rightIndicator="&#x2103;"
            />
            <TextFieldGroup
              id="maxTemperatureField"
              label={<span className="text-caption-lg">Suhu maksimal</span>}
              placeholder="Max"
              autoComplete="off"
              name="temperature_info.temperature_max"
              type="number"
              isError={errors.temperature_info?.temperature_max}
              register={{
                ...register("temperature_info.temperature_max", {
                  required: "Temperatur tidak boleh kosong",
                  valueAsNumber: true,
                }),
              }}
              rightIndicator="&#x2103;"
            />
          </div>
          {(errors.temperature_info?.temperature_min ||
            errors.temperature_info?.temperature_max) && (
            <div>
              <p className={`label-text-alt text-error text-caption-lg`}>
                <Info12Regular className="-mt-0.5" />{" "}
                {errors.temperature_info?.temperature_min?.message ??
                  errors.temperature_info?.temperature_max?.message}
              </p>
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="temperatureDescriptionField"
            className="text-body-sm font-semibold"
          >
            Deskripsi temperature tanaman
          </label>
          <ReactQuill
            id="temperatureDescriptionField"
            theme="snow"
            placeholder="Masukkan deskripsi informasi temperature tanaman"
            value={temperatureDescriptionContent}
            onChange={onTemperatureDescriptionStateChange}
            modules={MODULES}
            className={`h-[306px] mt-1 ${
              editorFocus && !errors.temperature_info?.temperature_description
                ? "ql-focus"
                : null
            } ${
              errors.temperature_info?.temperature_description
                ? "ql-error"
                : null
            }`}
            onFocus={() => {
              setEditorFocus(true);
            }}
            onBlur={() => {
              setEditorFocus(false);
            }}
          />
          <div className="mt-12"></div>
          {errors.temperature_info?.temperature_description && (
            <p
              className="text-error text-caption-lg"
              id="error-image-message"
            >
              <Info12Regular className="-mt-0.5" /> Deskripsi tidak boleh kosong
            </p>
          )}
        </div>
        <FileInput
          id="temperatureImageField"
          label={"Gambar  temperature tanaman"}
          value={useWatch({
            name: "temperature_info.temperature_pictures",
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
          name="temperature_info.temperature_pictures"
          message={
            <span>
              <Info12Regular className="me-1.5" />
              Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
            </span>
          }
          isError={errors.temperature_info?.temperature_pictures}
        />
      </div>
    </form>
  );
});

export default TemperaturForm;
