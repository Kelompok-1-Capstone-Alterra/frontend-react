import { useState, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Info12Regular } from "@fluentui/react-icons";
import ReactQuill from "react-quill";
import { useRecoilValue } from "recoil";

import MySelect from "../MySelect";
import { MODULES } from "../../constants";
import FileInput from "../FileInput";
import { addPlantDataState } from "../../utils/recoil_atoms";

export default function PemupukkanForm({ formId, onSubmit }) {
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

  console.log(errors);

  useEffect(() => {
    register("fertilizing_info.fertilizing_description", {
      required: "Wajib diisi",
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onDescStateChange = (state) => {
    setValue("fertilizing_info.fertilizing_description", state);
    trigger("fertilizing_info.fertilizing_description");
  };

  let descContent = watch("fertilizing_info.fertilizing_description");

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-10">
        <div>
          <label
            htmlFor="fertilizationAmountSelect"
            className="text-body-sm font-semibold"
          >
            Berapa kali pemupukkan
          </label>
          <Controller
            render={({ field }) => (
              <MySelect
                id="fertilizationAmountSelect"
                errors={errors.fertilizing_info?.fertilizing_limit}
                field={field}
                autoFocus
                options={[
                  { value: 3, label: "3 Kali" },
                  { value: 4, label: "4 Kali" },
                  { value: 5, label: "5 Kali" },
                  { value: 6, label: "6 Kali" },
                ]}
                placeholder="Pilih berapa kali pemupukkan"
                className="max-w-[421px] mt-1"
              />
            )}
            name="fertilizing_info.fertilizing_limit"
            control={control}
            defaultValue=""
            rules={{
              required: "Data pemupukkan tidak boleh kosong",
            }}
          />
          {errors.fertilizing_info?.fertilizing_limit && (
            <p className="text-error text-caption-lg mt-1">
              <Info12Regular className="-mt-0.5" />{" "}
              {errors.fertilizing_info?.fertilizing_limit?.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="fertilizationTimeSelect"
            className="text-body-sm font-semibold"
          >
            Waktu pemupukkan
          </label>
          <Controller
            render={({ field }) => (
              <MySelect
                id="fertilizationTimeSelect"
                errors={errors.fertilizing_info?.fertilizing_period}
                field={field}
                options={[
                  { value: 10, label: "10 Hari Sekali" },
                  { value: 15, label: "15 Hari Sekali" },
                  { value: 20, label: "20 Hari Sekali" },
                  { value: 30, label: "30 Hari Sekali" },
                ]}
                placeholder="Pilih waktu pemupukkan"
                className="max-w-[421px] mt-1"
              />
            )}
            name="fertilizing_info.fertilizing_period"
            control={control}
            defaultValue=""
            rules={{
              required: "Waktu pemupukkan tidak boleh kosong",
            }}
          />
          {errors.fertilizing_info?.fertilizing_period && (
            <p
              className="text-error text-caption-lg mt-1"
              id="error-image-message"
            >
              <Info12Regular className="-mt-0.5" />{" "}
              {errors.fertilizing_info?.fertilizing_period?.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="fertilizationMethodField"
            className="text-body-sm font-semibold"
          >
            Cara Pemupukkan
          </label>
          <ReactQuill
            id="fertilizationMethodField"
            theme="snow"
            placeholder="Masukkan deskripsi cara pemupukkan tanaman"
            value={descContent}
            onChange={onDescStateChange}
            modules={MODULES}
            className={`h-[306px] mt-1 ${
              editorFocus && !errors.fertilizing_info?.fertilizing_description
                ? "ql-focus"
                : null
            } ${
              errors.fertilizing_info?.fertilizing_description
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
          {errors.fertilizing_info?.fertilizing_description && (
            <p
              className="text-error text-caption-lg"
              id="error-image-message"
            >
              <Info12Regular className="-mt-0.5" /> Deskripsi tidak boleh kosong
            </p>
          )}
        </div>
        <FileInput
          id="fertilizationImageField"
          label={"Gambar Pemupukkan"}
          value={useWatch({
            name: "fertilizing_info.fertilizing_pictures",
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
          name="fertilizing_info.fertilizing_pictures"
          message={
            <span>
              <Info12Regular className="me-1.5" />
              Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
            </span>
          }
          isError={errors.fertilizing_info?.fertilizing_pictures}
        />
      </div>
    </form>
  );
}
