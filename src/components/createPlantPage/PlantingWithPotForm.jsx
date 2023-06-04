import { useEffect, useState } from "react";
import { Info12Regular } from "@fluentui/react-icons";
import { useFormContext, useWatch } from "react-hook-form";
import ReactQuill from "react-quill";

import FileInput from "../FileInput";
import TextField from "../TextField";
import { MODULES } from "../../constants";

export default function PlantingWithPotForm() {
  const {
    register,
    control,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const [editorFocus, setEditorFocus] = useState({
    container_method: false,
    container_tools: false,
  });

  useEffect(() => {
    register("planting.container_method", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
      shouldUnregister: true,
    });
    register("planting.container_tools", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
      shouldUnregister: true,
    });
  }, [register]);

  const onContainerMethodStateChange = (state) => {
    setValue("planting.container_method", state);
    trigger("planting.container_method");
  };

  const onContainerToolsStateChange = (state) => {
    setValue("planting.container_tools", state);
    trigger("planting.container_tools");
  };

  let containerMethodContent = watch("planting.container_method");
  let containerToolsContent = watch("planting.container_tools");

  return (
    <div className="flex flex-col gap-10 ps-10">
      <h6 className="text-h-6 font-bold">Menanam dengan pot</h6>
      <div>
        <label
          htmlFor="withPotPlantMethodField"
          className="text-body-sm font-semibold"
        >
          Cara Menanam
        </label>
        <ReactQuill
          id="withPotPlantMethodField"
          theme="snow"
          placeholder="Masukkan langkah-langkah cara penanaman"
          value={containerMethodContent}
          onChange={onContainerMethodStateChange}
          modules={MODULES}
          className={`h-[306px] mt-1 ${
            editorFocus.planting?.container_method &&
            !errors.planting?.container_method
              ? "ql-focus"
              : null
          } ${errors.planting?.container_method ? "ql-error" : null}`}
          onFocus={() => {
            setEditorFocus((prev) => ({
              ...prev,
              container_method: true,
            }));
          }}
          onBlur={() => {
            setEditorFocus((prev) => ({
              ...prev,
              container_method: false,
            }));
          }}
        />
        <div className="mt-12"></div>
        {errors.planting?.container_method && (
          <p
            className="text-error text-caption-lg"
            id="error-image-message"
          >
            <Info12Regular className="-mt-0.5" /> Deskripsi tidak boleh kosong
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="withPotPlantDescriptionField"
          className="text-body-sm font-semibold"
        >
          Alat dan Bahan untuk Penanaman
        </label>
        <ReactQuill
          id="withPotPlantDescriptionField"
          theme="snow"
          placeholder="Masukkan alat dan bahan untuk penanaman"
          value={containerToolsContent}
          onChange={onContainerToolsStateChange}
          modules={MODULES}
          className={`h-[306px] mt-1 ${
            editorFocus.planting?.container_tools &&
            !errors.planting?.container_tools
              ? "ql-focus"
              : null
          } ${errors.planting?.container_tools ? "ql-error" : null}`}
          onFocus={() => {
            setEditorFocus((prev) => ({
              ...prev,
              container_tools: true,
            }));
          }}
          onBlur={() => {
            setEditorFocus((prev) => ({
              ...prev,
              container_tools: false,
            }));
          }}
        />
        <div className="mt-12"></div>
        {errors.planting?.container_tools && (
          <p
            className="text-error text-caption-lg"
            id="error-image-message"
          >
            <Info12Regular className="-mt-0.5" /> Deskripsi tidak boleh kosong
          </p>
        )}
      </div>
      <TextField
        id="withPotVideoLinkField"
        label={"Link Vidio Cara Penanaman"}
        autoComplete="off"
        placeholder="Masukkan link vidio cara penanaman"
        isError={errors.planting?.url_container}
        register={{
          ...register("planting.url_container", {
            shouldUnregister: true,
            required: "Link tidak boleh kosong",
          }),
        }}
        message={
          errors.planting?.url_container && (
            <span>
              <Info12Regular className="-mt-0.5" />{" "}
              {errors.planting?.url_container.message}
            </span>
          )
        }
      />
      <FileInput
        id="withPotImageField"
        label={"Gambar Penanaman dengan pot"}
        value={useWatch({ name: "planting.container_pict", control: control })}
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
        name="planting.container_pict"
        message={
          <span>
            <Info12Regular className="me-1.5" />
            Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
          </span>
        }
        isError={errors.planting?.container_pict}
      />
    </div>
  );
}
