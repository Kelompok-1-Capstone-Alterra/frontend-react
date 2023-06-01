import React, { useState, useEffect } from "react";
import { Info12Regular } from "@fluentui/react-icons";
import { Controller, useForm } from "react-hook-form";
import TextField from "../components/TextField";
import Button from "../components/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/Modal";
import useSWR from "swr";
import FileInput from "../components/FileInput";
import MySelect from "../components/MySelect";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import { MODULES } from "../constants";

const CreateWeatherPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    control,
    useWatch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmModalCancelOut, setIsConfirmModalOut] = useState(false);
  const [formData, setFormData] = useState(null);
  const [existingWeatherLabels, setExistingWeatherLabels] = useState([]);
  const [editorFocus, setEditorFocus] = useState(false);
  const weatherOptions = ["Cerah", "Mendung", "Berawan", "Hujan"];
  const url = "https://642cdf18bf8cbecdb4f8b260.mockapi.io/weathers";
  const { data: weatherData } = useSWR(url, async (url) => {
    const response = await axios.get(url);
    return response.data;
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (weatherData) {
          const labels = weatherData.map((weather) => weather.label);
          setExistingWeatherLabels(labels);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    fetchWeatherData();
  }, [weatherData]);

  useEffect(() => {
    register("deskripsi", {
      required: "Deskripsi tidak boleh kosong",
      validate: (value) =>
        value !== "<p><br></p>" || "Deskripsi tidak boleh kosong",
    });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue("deskripsi", editorState);
    trigger("deskripsi");
  };

  let content = watch("deskripsi");
  let gambar = watch("gambar");

  const onSubmit = async (data) => {
    setFormData(data);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmModal = async () => {
    try {
      const requestData = {
        judul: formData.judul,
        label: formData.label.label,
        gambar: formData.gambar,
        deskripsi: content,
      };

      const response = await axios.post(url, requestData);

      console.log("Data berhasil dikirim:", response.data);
      reset();
      const updatedLabels = [...existingWeatherLabels, formData.label.label];
      setExistingWeatherLabels(updatedLabels);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setIsConfirmModalOpen(false);
      setFormData(null);
    }
  };

  const handleCancelModal = () => {
    setIsConfirmModalOpen(false);
  };
  const handleCancelOut = () => {
    setIsConfirmModalOut(false);
  };
  const handleConfirmCancelModal = () => {
    navigate("/admin/weathers");
    setIsConfirmModalOut(false);
  };

  const noOptions =
    weatherOptions.filter((option) => !existingWeatherLabels.includes(option))
      .length === 0;

  return (
    <>
      <SecondaryContainer
        backTo="/admin/weathers"
        title="Upload Informasi cuaca"
        className={"pe-3"}>
        <div className="mx-8">
          <div className="form-create">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label={"Judul"}
                autoComplete="off"
                placeholder="Masukan Judul Peringatan"
                isError={errors.judul}
                message={
                  errors.judul && (
                    <span>
                      <Info12Regular className="-mt-0.5" />{" "}
                      {errors.judul.message}
                    </span>
                  )
                }
                register={{
                  ...register("judul", {
                    required: "Judul tidak boleh kosong",
                    minLength: {
                      value: 2,
                      message: "Minimal 2 karakter",
                    },
                  }),
                }}
                id="judul"
              />

              <div className="flex justify-between mt-3">
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
                        options={weatherOptions
                          .filter(
                            (option) => !existingWeatherLabels.includes(option)
                          )
                          .map((option) => ({
                            label: option,
                            value: option,
                          }))}
                        placeholder="Pilih label cuaca"
                        className="w-96"
                        noOptionsMessage={() => "Tidak ada pilihan label"}
                      />
                    )}
                    name="label"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: {
                        value: true,
                        message: "Harus memilih label",
                      },
                    }}
                  />

                  {errors.label && (
                    <p className="text-error text-caption-lg mt-1 ">
                      <span>
                        <Info12Regular className="-mt-0.5 mr-1" />
                      </span>
                      {errors.label?.message}
                    </p>
                  )}
                </div>

                <FileInput
                  id="gambarWeather"
                  label={"Gambar Tanaman"}
                  // control ={control}
                  value={gambar}
                  rules={{ required: true }}
                  control={control}
                  name="gambar"
                  // className="mt-10"
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
              <label htmlFor="deskripsi" className="text-body-lg font-semibold">
                Deskripsi
              </label>
              <div className="mb-6">
                <ReactQuill
                  theme="snow"
                  id="deskripsi"
                  modules={MODULES}
                  placeholder="Masukan Deskripsi"
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
                  isConfirmModalOpen ? "block" : "hidden"
                } cursor-pointer top-0 bottom-0 left-0 right-0`}>
                <ConfirmModal
                  isOpen={isConfirmModalOpen}
                  text="Pastikan kembali informasi yang akan dikirim sudah sesuai"
                  title="Upload Informasi Cuaca"
                  cancelText="Batal"
                  confirmText="Kirim"
                  onConfirm={handleConfirmModal}
                  onCancel={handleCancelModal}
                />
              </div>
              <div
                className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
                  isConfirmModalCancelOut ? "block" : "hidden"
                } cursor-pointer top-0 bottom-0 left-0 right-0`}>
                <ConfirmModal
                  isOpen={isConfirmModalCancelOut}
                  text="Kamu yakin ingin keluar tanpa mengirim informasi yang sudah kamu buat?"
                  title="Informasi belum terkirim"
                  cancelText="Batal"
                  confirmText="Keluar"
                  onConfirm={handleConfirmCancelModal}
                  onCancel={handleCancelOut}
                />
              </div>
              <div className="flex justify-end gap-x-3.5 pt-5">
                <Button
                  type="button"
                  children={"Batal"}
                  size="md"
                  variant={noOptions ? "green" : "outline-green"}
                  disabled={noOptions}
                  onClick={() => setIsConfirmModalOut(true)}
                />
                <Button
                  type="button"
                  children={"Kirim"}
                  size="md"
                  onClick={handleSubmit(onSubmit)}
                  disabled={noOptions}
                />
              </div>
            </form>
          </div>
        </div>
      </SecondaryContainer>
    </>
  );
};

export default CreateWeatherPage;
