import { useEffect, useState } from "react";
import { Info12Regular } from "@fluentui/react-icons";
import { useFormContext, useWatch } from "react-hook-form";
import ReactQuill from "react-quill";

import FileInput from "../FileInput";
import TextField from "../TextField";
import { MODULES } from "../../constants";

export default function PlantingWithoutPotForm() {
  const {
    register,
    control,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const [editorFocus, setEditorFocus] = useState({
    ground_instruction: false,
    ground_materials: false,
  });

  useEffect(() => {
    register("planting_info.ground_info.ground_instruction", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
      shouldUnregister: true,
    });
    register("planting_info.ground_info.ground_materials", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
      shouldUnregister: true,
    });
  }, [register]);

  const onInGroundMethodStateChange = (state) => {
    setValue("planting_info.ground_info.ground_instruction", state);
    trigger("planting_info.ground_info.ground_instruction");
  };

  const onInGroundToolsStateChange = (state) => {
    setValue("planting_info.ground_info.ground_materials", state);
    trigger("planting_info.ground_info.ground_materials");
  };

  let inGroundMethodContent = watch(
    "planting_info.ground_info.ground_instruction"
  );
  let inGroundToolsContent = watch(
    "planting_info.ground_info.ground_materials"
  );

  return (
    <div className="flex flex-col gap-10 ps-10">
      <h6 className="text-h-6 font-bold">Menanam tanpa pot</h6>
      <div>
        <label
          htmlFor="withoutPotPlantMethodField"
          className="text-body-sm font-semibold"
        >
          Cara Menanam
        </label>
        <ReactQuill
          id="withoutPotPlantMethodField"
          theme="snow"
          placeholder="Masukkan langkah-langkah cara penanaman"
          value={inGroundMethodContent}
          onChange={onInGroundMethodStateChange}
          modules={MODULES}
          className={`h-[306px] mt-1 ${
            editorFocus["in-ground_method"] &&
            !errors.planting_info?.ground_info?.ground_instruction
              ? "ql-focus"
              : null
          } ${
            errors.planting_info?.ground_info?.ground_instruction
              ? "ql-error"
              : null
          }`}
          onFocus={() => {
            setEditorFocus((prev) => ({
              ...prev,
              ground_instruction: true,
            }));
          }}
          onBlur={() => {
            setEditorFocus((prev) => ({
              ...prev,
              ground_instruction: false,
            }));
          }}
        />
        <div className="mt-12"></div>
        {errors.planting_info?.ground_info?.ground_instruction && (
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
          htmlFor="withoutPotPlantDescriptionField"
          className="text-body-sm font-semibold"
        >
          Alat dan Bahan untuk Penanaman
        </label>
        <ReactQuill
          id="withoutPotPlantDescriptionField"
          theme="snow"
          placeholder="Masukkan langkah-langkah cara penanaman"
          value={inGroundToolsContent}
          onChange={onInGroundToolsStateChange}
          modules={MODULES}
          className={`h-[306px] mt-1 ${
            editorFocus["in-ground_tools"] &&
            !errors.planting_info?.ground_info?.ground_materials
              ? "ql-focus"
              : null
          } ${
            errors.planting_info?.ground_info?.ground_materials
              ? "ql-error"
              : null
          }`}
          onFocus={() => {
            setEditorFocus((prev) => ({
              ...prev,
              ground_materials: true,
            }));
          }}
          onBlur={() => {
            setEditorFocus((prev) => ({
              ...prev,
              ground_materials: false,
            }));
          }}
        />
        <div className="mt-12"></div>
        {errors.planting_info?.ground_info?.ground_materials && (
          <p
            className="text-error text-caption-lg"
            id="error-image-message"
          >
            <Info12Regular className="-mt-0.5" /> Deskripsi tidak boleh kosong
          </p>
        )}
      </div>
      <TextField
        id="withoutPotVideoLinkField"
        label={"Link Vidio Cara Penanaman"}
        autoComplete="off"
        placeholder="Masukkan link vidio cara penanaman"
        isError={errors.planting_info?.ground_info?.ground_video}
        register={{
          ...register("planting_info.ground_info.ground_video", {
            shouldUnregister: true,
            required: "Link tidak boleh kosong",
          }),
        }}
        message={
          errors.planting_info?.ground_info?.ground_video && (
            <span>
              <Info12Regular className="-mt-0.5" />{" "}
              {errors.planting_info?.ground_info?.ground_video.message}
            </span>
          )
        }
      />
      <FileInput
        id="withoutPotImageField"
        label={"Gambar Penanaman tanpa pot"}
        value={useWatch({
          name: "planting_info.ground_info.ground_pictures",
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
        name="planting_info.ground_info.ground_pictures"
        message={
          <span>
            <Info12Regular className="me-1.5" />
            Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
          </span>
        }
        isError={errors.planting_info?.ground_info?.ground_pictures}
      />
    </div>
  );
}
