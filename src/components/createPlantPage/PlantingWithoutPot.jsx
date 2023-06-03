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
    "in-ground_method": false,
    "in-ground_tools": false,
  });

  useEffect(() => {
    register("planting.in-ground_method", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
      shouldUnregister: true,
    });
    register("planting.in-ground_tools", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
      shouldUnregister: true,
    });
  }, [register]);

  const onInGroundMethodStateChange = (state) => {
    setValue("planting.in-ground_method", state);
    trigger("planting.in-ground_method");
  };

  const onInGroundToolsStateChange = (state) => {
    setValue("planting.in-ground_tools", state);
    trigger("planting.in-ground_tools");
  };

  let inGroundMethodContent = watch("planting.in-ground_method");
  let inGroundToolsContent = watch("planting.in-ground_tools");

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
            !errors.planting?.["in-ground_method"]
              ? "ql-focus"
              : null
          } ${errors.planting?.["in-ground_method"] ? "ql-error" : null}`}
          onFocus={() => {
            setEditorFocus((prev) => ({
              ...prev,
              "in-ground_method": true,
            }));
          }}
          onBlur={() => {
            setEditorFocus((prev) => ({
              ...prev,
              "in-ground_method": false,
            }));
          }}
        />
        <div className="mt-12"></div>
        {errors.planting?.["in-ground_method"] && (
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
            !errors.planting?.["in-ground_tools"]
              ? "ql-focus"
              : null
          } ${errors.planting?.["in-ground_tools"] ? "ql-error" : null}`}
          onFocus={() => {
            setEditorFocus((prev) => ({
              ...prev,
              "in-ground_tools": true,
            }));
          }}
          onBlur={() => {
            setEditorFocus((prev) => ({
              ...prev,
              "in-ground_tools": false,
            }));
          }}
        />
        <div className="mt-12"></div>
        {errors.planting?.["in-ground_tools"] && (
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
        isError={errors.planting?.url_inground}
        register={{
          ...register("planting.url_inground", {
            shouldUnregister: true,
            required: "Link tidak boleh kosong",
          }),
        }}
        message={
          errors.planting?.url_inground && (
            <span>
              <Info12Regular className="-mt-0.5" />{" "}
              {errors.planting?.url_inground.message}
            </span>
          )
        }
      />
      <FileInput
        id="withoutPotImageField"
        label={"Gambar Penanaman tanpa pot"}
        value={useWatch({ name: "planting.inground_pict", control: control })}
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
        name="planting.inground_pict"
        message={
          <span>
            <Info12Regular className="me-1.5" />
            Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
          </span>
        }
        isError={errors.planting?.inground_pict}
      />
    </div>
  );
}
