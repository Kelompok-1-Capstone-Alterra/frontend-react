import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Info12Regular } from "@fluentui/react-icons";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useRecoilValue } from "recoil";

import MySelect from "../MySelect";
import { MODULES } from "../../constants";
import FileInput from "../FileInput";
import { addPlantDataState } from "../../utils/recoil_atoms";

export default function PenyiramanForm({ formId, onSubmit }) {
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
    register("watering.desc", {
      required: "Wajib diisi",
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onWateringDescriptionStateChange = (state) => {
    setValue("watering.desc", state);
    trigger("watering.desc");
  };

  let wateringDescriptionContent = watch("watering.desc");

  return (
    <form
      id={formId}
      onSubmit={handleSubmit((data) => onSubmit(data, "watering"))}
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
                errors={errors.watering?.period}
                field={field}
                options={[
                  { value: 1, label: "1 kali sehari" },
                  { value: 2, label: "2 kali sehari" },
                ]}
                placeholder="Pilih penyiraman"
                className="max-w-[421px] mt-1"
              />
            )}
            name="watering.period"
            control={control}
            defaultValue=""
            rules={{
              required: "Waktu penyiraman tidak boleh kosong",
            }}
          />
          {errors.watering?.period && (
            <p className="text-error text-caption-lg mt-1">
              <Info12Regular className="-mt-0.5" />{" "}
              {errors.watering?.period?.message}
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
              editorFocus && !errors.watering?.desc ? "ql-focus" : null
            } ${errors.watering?.desc ? "ql-error" : null}`}
            onFocus={() => {
              setEditorFocus(true);
            }}
            onBlur={() => {
              setEditorFocus(false);
            }}
          />
          <div className="mt-12"></div>
          {errors.watering?.desc && (
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
          value={useWatch({ name: "watering.pict", control: control })}
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
          name="watering.pict"
          message={
            <span>
              <Info12Regular className="me-1.5" />
              Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
            </span>
          }
          isError={errors.watering?.pict}
        />
      </div>
    </form>
  );
}
