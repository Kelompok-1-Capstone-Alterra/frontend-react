import React, { useState, useEffect } from "react";
import { Info12Regular } from "@fluentui/react-icons";
import { useForm, Controller } from "react-hook-form";
import TextField from "../components/TextField";
import Button from "../components/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmModal, NotifModal } from "../components/Modal";
import useSWR from "swr";
import FileInput from "../components/FileInput";
import MySelect from "../components/MySelect";
import { MODULES } from "../constants";
import SecondaryContainer from "../components/layouts/SecondaryContainer";

const UpdateWeatherPage = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [editorFocus, setEditorFocus] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [weatherOptions, setWeatherOptions] = useState([]);
  const url = `https://642cdf18bf8cbecdb4f8b260.mockapi.io/weathers/${id}`;
  const { data: weatherData } = useSWR(url, async (url) => {
    const response = await axios.get(url);
    return response.data;
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (weatherData) {
          setValue("judul", weatherData.judul);
          setValue("label", {
            label: weatherData.label,
            value: weatherData.label,
          });
          setValue("deskripsi", weatherData.deskripsi);
          setValue("gambar", weatherData.gambar);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    const fetchWeatherOptions = async () => {
      try {
        const response = await axios.get(
          "https://642cdf18bf8cbecdb4f8b260.mockapi.io/weathers"
        );

        const existingLabels = response.data.map((option) => option.label);

        const options = [
          { label: "Cerah", value: "Cerah" },
          { label: "Hujan", value: "Hujan" },
          { label: "Mendung", value: "Mendung" },
          { label: "Berawan", value: "Berawan" },
        ];
        const newOptions = options.filter(
          (option) =>
            !existingLabels.includes(option.value) ||
            option.value === weatherData?.label
        );
        setWeatherOptions(newOptions);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    fetchWeatherData();
    fetchWeatherOptions();
  }, [weatherData]);

  useEffect(() => {
    register("label", {
      required: "Label cuaca tidak boleh kosong",
    });
  }, [register]);

  useEffect(() => {
    register("deskripsi", {
      required: "Deskripsi tidak boleh kosong",
      validate: (value) =>
        value !== "<p><br></p>" || "Deskripsi tidak boleh kosong",
    });
  }, [register]);

  let gambar = watch("gambar");
  let content = watch("deskripsi");
  const onEditorStateChange = (editorState) => {
    setValue("deskripsi", editorState);
    trigger("deskripsi");
  };

  const onSubmit = async (data) => {
    setFormData(data);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmModal = async () => {
    try {
      const requestData = {
        judul: formData.judul,
        label: formData.label.label,
        // gambar: formData.gambar,
        deskripsi: content,
      };

      await axios.put(url, requestData);
      setIsNotifModalOpen(true);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }

    setIsConfirmModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleNotifModal = () => {
    setIsNotifModalOpen(false);
    navigate("/admin/weathers");
  };

  return (
    <>
      <SecondaryContainer
        backTo="/admin/weathers"
        title="Edit Informasi cuaca"
        className="pe-3">
        <div className="mx-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Judul"
              autoComplete="off"
              placeholder="Masukkan Judul Peringatan"
              isError={errors.judul}
              message={
                errors.judul && (
                  <span>
                    <Info12Regular className="-mt-0.5" /> {errors.judul.message}
                  </span>
                )
              }
              register={{
                ...register("judul", {
                  required: "Judul tidak boleh kosong",
                }),
              }}
              id="judul"
            />

            <div className="flex justify-between mb-4 mt-3">
              <div>
                <label className="text-body-sm font-semibold">
                  Label Cuaca
                </label>
                <div className="mb-1"></div>
                <Controller
                  render={({ field }) => (
                    <MySelect
                      errors={errors.label}
                      field={field}
                      id="label"
                      options={weatherOptions}
                      placeholder="Pilih Label"
                      className="w-96"
                    />
                  )}
                  name="label"
                  control={control}
                />
                {errors.label && (
                  <p className="text-error text-caption-lg mt-1">
                    <span>
                      <Info12Regular className="-mt-0.5 mr-1" />
                    </span>
                    {errors.label.message}
                  </p>
                )}
              </div>
              <div className="">
                <FileInput
                  id="gambar"
                  label="Upload File"
                  rules={{ required: true }}
                  control={control}
                  name="gambar"
                  value={watch("gambar")}
                  message={
                    <span>
                      <Info12Regular className="me-1.5" />
                      Wajib di isi maksimal 1MB, Hanya file berformat .JPG,
                      .JPEG, .PNG
                    </span>
                  }
                  isError={errors.gambar}
                />
              </div>
            </div>
            <label htmlFor="deskripsi" className="text-body-lg font-semibold">
              Deskripsi
            </label>
            <div className="mb-6">
              <ReactQuill
                theme="snow"
                id="deskripsi"
                modules={MODULES}
                placeholder="Masukkan Deskripsi"
                value={content}
                onChange={onEditorStateChange}
                className={`h-[306px] ${
                  editorFocus && !errors.deskripsi ? "ql-focus" : null
                } ${errors.deskripsi ? "ql-error" : null}`}
                onFocus={() => {
                  setEditorFocus(true);
                }}
                onBlur={() => {
                  setEditorFocus(false);
                }}
              />
              <div className="mt-12">
                {errors.deskripsi && (
                  <p className="text-error text-caption-lg mt-1 ">
                    <span>
                      <Info12Regular className="-mt-0.5 mr-1" />
                    </span>
                    {errors.deskripsi.message}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
                isConfirmModalOpen || isNotifModalOpen ? "block" : "hidden"
              } cursor-pointer top-0 bottom-0 left-0 right-0`}>
              <ConfirmModal
                isOpen={isConfirmModalOpen}
                text="Pastikan kembali informasi yang akan dikirim sudah sesuai"
                title="Edit Informasi cuaca"
                cancelText="Batal"
                confirmText="Kirim"
                onConfirm={handleConfirmModal}
                onCancel={handleCancelModal}
              />
              <NotifModal
                isOpen={isNotifModalOpen}
                text="Informasi cuaca berhasil di ubah"
                title="Ubah Informasi cuaca"
                confirmText="Tutup"
                icon="success"
                onConfirm={handleNotifModal}
              />
            </div>
            <div className="flex justify-end gap-x-3.5 pt-5">
              <Button type="submit" children="Kirim" size="md" />
            </div>
          </form>
        </div>
      </SecondaryContainer>
    </>
  );
};

export default UpdateWeatherPage;
