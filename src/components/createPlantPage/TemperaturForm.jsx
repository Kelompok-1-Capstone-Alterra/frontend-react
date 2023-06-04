import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Info12Regular } from "@fluentui/react-icons";
import { useForm, useWatch } from "react-hook-form";
import { useRecoilValue } from "recoil";

import { MODULES } from "../../constants";
import FileInput from "../FileInput";
import { addPlantDataState } from "../../utils/recoil_atoms";
import TextFieldGroup from "../TextFieldGroup";

export default function TemperaturForm({ formId, onSubmit }) {
  const addPlantData = useRecoilValue(addPlantDataState);
  const [editorFocus, setEditorFocus] = useState(false);
  const {
    register,
    setValue,
    trigger,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: addPlantData });

  useEffect(() => {
    register("temperature.desc", {
      required: "Wajib diisi",
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onTemperatureDescriptionStateChange = (state) => {
    setValue("temperature.desc", state);
    trigger("temperature.desc");
  };

  let temperatureDescriptionContent = watch("temperature.desc");

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
              name="temperature.ideal_temp.min"
              type="number"
              isError={errors.temperature?.ideal_temp?.min}
              register={{
                ...register("temperature.ideal_temp.min", {
                  required: "Temperatur tidak boleh kosong",
                }),
              }}
              rightIndicator="&#x2103;"
            />
            <TextFieldGroup
              id="maxTemperatureField"
              label={<span className="text-caption-lg">Suhu maksimal</span>}
              placeholder="Max"
              autoComplete="off"
              name="temperature.ideal_temp.max"
              type="number"
              isError={errors.temperature?.ideal_temp?.max}
              register={{
                ...register("temperature.ideal_temp.max", {
                  required: "Temperatur tidak boleh kosong",
                }),
              }}
              rightIndicator="&#x2103;"
            />
          </div>
          {(errors.temperature?.ideal_temp?.min ||
            errors.temperature?.ideal_temp?.max) && (
            <div>
              <p className={`label-text-alt text-error text-caption-lg`}>
                <Info12Regular className="-mt-0.5" />{" "}
                {errors.temperature?.ideal_temp?.min?.message ??
                  errors.temperature?.ideal_temp?.max?.message}
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
            placeholder="Masukkan deskripsi informasi penyiraman tanaman"
            value={temperatureDescriptionContent}
            onChange={onTemperatureDescriptionStateChange}
            modules={MODULES}
            className={`h-[306px] mt-1 ${
              editorFocus && !errors.temperature?.desc ? "ql-focus" : null
            } ${errors.temperature?.desc ? "ql-error" : null}`}
            onFocus={() => {
              setEditorFocus(true);
            }}
            onBlur={() => {
              setEditorFocus(false);
            }}
          />
          <div className="mt-12"></div>
          {errors.temperature?.desc && (
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
          value={useWatch({ name: "temperature.pict", control: control })}
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
          name="temperature.pict"
          message={
            <span>
              <Info12Regular className="me-1.5" />
              Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
            </span>
          }
          isError={errors.temperature?.pict}
        />
      </div>
    </form>
  );
}
