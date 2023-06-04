import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Info12Regular } from "@fluentui/react-icons";
import ReactQuill from "react-quill";

import TextField from "../TextField";
import FileInput from "../FileInput";
import { MODULES } from "../../constants";
import { useRecoilValue } from "recoil";
import { addPlantDataState } from "../../utils/recoil_atoms";

// const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function DetailTanamanForm({ formId, onSubmit }) {
  const addPlantData = useRecoilValue(addPlantDataState);

  // try {
  //   const { data } = useSWR(
  //     `http://34.128.85.215:8080/pictures?path=0cac3677-2a12-4c2e-b936-f32f2acc2a2b.png`,
  //     fetcher
  //   );
  //   console.log(data);
  // } catch (error) {
  //   console.log(error);
  // }

  const {
    register,
    setValue,
    trigger,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: addPlantData,
  });

  const [editorFocus, setEditorFocus] = useState(false);

  useEffect(() => {
    register("detail.desc", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onPlantDescriptionStateChange = (state) => {
    setValue("detail.desc", state);
    trigger("detail.desc");
  };

  let plantDescriptionContent = watch("detail.desc");

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
          isError={errors.detail?.name}
          register={{
            ...register("detail.name", {
              required: "Nama tanaman tidak boleh kosong",
            }),
          }}
          message={
            errors.detail?.name && (
              <span>
                <Info12Regular className="-mt-0.5" />{" "}
                {errors.detail?.name.message}
              </span>
            )
          }
        />
        <TextField
          id="plantLatinNameField"
          label={"Nama Latin Tanaman"}
          autoComplete="off"
          placeholder="Masukkan nama latin tanaman"
          isError={errors.detail?.latin}
          register={{
            ...register("detail.latin", {
              required: "Nama latin tanaman tidak boleh kosong",
            }),
          }}
          message={
            errors.detail?.latin && (
              <span>
                <Info12Regular className="-mt-0.5" />{" "}
                {errors.detail?.latin.message}
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
              editorFocus && !errors.detail?.desc ? "ql-focus" : null
            } ${errors.detail?.desc ? "ql-error" : null}`}
            onFocus={() => {
              setEditorFocus(true);
            }}
            onBlur={() => {
              setEditorFocus(false);
            }}
          />
          <div className="mt-12"></div>
          {errors.detail?.desc && (
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
          value={useWatch({ name: "detail.pict", control: control })}
          rules={{
            required: true,
            validate: {
              lessThan1MB: (file) => file.size < 1000000,
              acceptedFormats: (file) =>
                ["image/jpeg", "image/png", "image/jpg"].includes(file?.type),
            },
          }}
          control={control}
          name="detail.pict"
          className="mt-10"
          message={
            <span>
              <Info12Regular className="me-1.5" />
              Maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
            </span>
          }
          isError={errors.detail?.pict}
        />
      </div>
    </form>
  );
}
