import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Info12Regular } from "@fluentui/react-icons";
import ReactQuill from "react-quill";

import TextField from "../TextField";
import FileInput from "../FileInput";
import { MODULES } from "../../constants";
import { useRecoilValue } from "recoil";
import { addPlantDataState } from "../../utils/recoil_atoms";
import { iterateConvertFileToBase64 } from "../../utils/functions";

const DetailTanamanForm = forwardRef(function DetailTanamanForm(
  { formId, onSubmit },
  ref
) {
  const addPlantData = useRecoilValue(addPlantDataState);

  const {
    register,
    setValue,
    trigger,
    control,
    watch,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: addPlantData,
  });

  useEffect(() => {
    if (addPlantData?.plant_name) {
      reset(addPlantData);
    }
  }, [addPlantData, reset]);

  useImperativeHandle(ref, () => {
    return {
      getFormValues: async () => {
        const formValues = getValues();

        const newFormValues = await iterateConvertFileToBase64(formValues);

        return newFormValues;
      },
    };
  });

  const [editorFocus, setEditorFocus] = useState(false);

  useEffect(() => {
    register("plant_description", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onPlantDescriptionStateChange = (state) => {
    setValue("plant_description", state);
    trigger("plant_description");
  };

  let plantDescriptionContent = watch("plant_description");

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-10">
        <TextField
          id="plantNameField"
          label={"Nama Tanaman"}
          autoFocus
          autoComplete="off"
          placeholder="Masukkan nama tanaman"
          isError={errors.plant_name}
          register={{
            ...register("plant_name", {
              required: "Nama tanaman tidak boleh kosong",
            }),
          }}
          message={
            errors.plant_name && (
              <span>
                <Info12Regular className="-mt-0.5" />{" "}
                {errors.plant_name.message}
              </span>
            )
          }
        />
        <TextField
          id="plantLatinNameField"
          label={"Nama Latin Tanaman"}
          autoComplete="off"
          placeholder="Masukkan nama latin tanaman"
          isError={errors.plant_latin}
          register={{
            ...register("plant_latin", {
              required: "Nama latin tanaman tidak boleh kosong",
            }),
          }}
          message={
            errors.plant_latin && (
              <span>
                <Info12Regular className="-mt-0.5" />{" "}
                {errors.plant_latin.message}
              </span>
            )
          }
        />
        <div>
          <label
            htmlFor="plantDescriptionField"
            className="text-body-sm font-semibold"
          >
            Deskripsi
          </label>
          <ReactQuill
            theme="snow"
            id="plantDescriptionField"
            value={plantDescriptionContent}
            onChange={onPlantDescriptionStateChange}
            modules={MODULES}
            placeholder="Masukkan deskripsi produk"
            className={`h-[306px] ${
              editorFocus && !errors.plant_description ? "ql-focus" : null
            } ${errors.plant_description ? "ql-error" : null}`}
            onFocus={() => {
              setEditorFocus(true);
            }}
            onBlur={() => {
              setEditorFocus(false);
            }}
          />
          <div className="mt-12"></div>
          {errors.plant_description && (
            <p
              className="text-error text-caption-lg"
              id="error-image-message"
            >
              <Info12Regular className="-mt-0.5" /> Deskripsi tidak boleh kosong
            </p>
          )}
        </div>
        <FileInput
          id="plantImageInput"
          label={"Gambar Tanaman"}
          value={useWatch({ name: "plant_pictures", control: control })}
          rules={{
            required: true,
            validate: {
              lessThan1MB: (file) => file.size < 1000000,
              acceptedFormats: (file) =>
                ["image/jpeg", "image/png", "image/jpg"].includes(file?.type),
            },
          }}
          control={control}
          name="plant_pictures"
          className="mt-10"
          message={
            <span>
              <Info12Regular className="me-1.5" />
              Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
            </span>
          }
          isError={errors.plant_pictures}
        />
      </div>
    </form>
  );
});

export default DetailTanamanForm;
