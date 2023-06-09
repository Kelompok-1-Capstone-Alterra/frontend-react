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
    container_instruction: false,
    container_materials: false,
  });

  useEffect(() => {
    // Unregister fields when unmount
    register("planting_info.container_info.container_instruction", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
      shouldUnregister: true,
    });
    register("planting_info.container_info.container_materials", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
      shouldUnregister: true,
    });
  }, [register]);

  const onContainerInstructionStateChange = (state) => {
    setValue("planting_info.container_info.container_instruction", state);
    trigger("planting_info.container_info.container_instruction");
  };

  const onContainerMaterialsStateChange = (state) => {
    setValue("planting_info.container_info.container_materials", state);
    trigger("planting_info.container_info.container_materials");
  };

  let containerInstructionContent = watch(
    "planting_info.container_info.container_instruction"
  );
  let containerMaterialsContent = watch(
    "planting_info.container_info.container_materials"
  );

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
          value={containerInstructionContent}
          onChange={onContainerInstructionStateChange}
          modules={MODULES}
          className={`h-[306px] mt-1 ${
            editorFocus.container_instruction &&
            !errors.planting_info?.container_info?.container_instruction
              ? "ql-focus"
              : null
          } ${
            errors.planting_info?.container_info?.container_instruction
              ? "ql-error"
              : null
          }`}
          onFocus={() => {
            setEditorFocus((prev) => ({
              ...prev,
              container_instruction: true,
            }));
          }}
          onBlur={() => {
            setEditorFocus((prev) => ({
              ...prev,
              container_instruction: false,
            }));
          }}
        />
        <div className="mt-12"></div>
        {errors.planting_info?.container_info?.container_instruction && (
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
          value={containerMaterialsContent}
          onChange={onContainerMaterialsStateChange}
          modules={MODULES}
          className={`h-[306px] mt-1 ${
            editorFocus.container_materials &&
            !errors.planting_info?.container_info?.container_materials
              ? "ql-focus"
              : null
          } ${
            errors.planting_info?.container_info?.container_materials
              ? "ql-error"
              : null
          }`}
          onFocus={() => {
            setEditorFocus((prev) => ({
              ...prev,
              container_materials: true,
            }));
          }}
          onBlur={() => {
            setEditorFocus((prev) => ({
              ...prev,
              container_materials: false,
            }));
          }}
        />
        <div className="mt-12"></div>
        {errors.planting_info?.container_info?.container_materials && (
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
        isError={errors.planting_info?.container_info?.container_video}
        register={{
          ...register("planting_info.container_info.container_video", {
            shouldUnregister: true,
            required: "Link tidak boleh kosong",
          }),
        }}
        message={
          errors.planting_info?.container_info?.container_video && (
            <span>
              <Info12Regular className="-mt-0.5" />{" "}
              {errors.planting_info?.container_info?.container_video.message}
            </span>
          )
        }
      />
      <FileInput
        id="withPotImageField"
        label={"Gambar Penanaman dengan pot"}
        value={useWatch({
          name: "planting_info.container_info.container_pictures",
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
        name="planting_info.container_info.container_pictures"
        message={
          <span>
            <Info12Regular className="me-1.5" />
            Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
          </span>
        }
        isError={errors.planting_info?.container_info?.container_pictures}
      />
    </div>
  );
}
