import { useState, useEffect } from "react";
import { Info12Regular } from "@fluentui/react-icons";
import { Controller, useForm } from "react-hook-form";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { ConfirmModal, NotifModal } from "../../components/Modal";
import useSWR from "swr";
import FileInput from "../../components/FileInput";
import MySelect from "../../components/MySelect";
import SecondaryContainer from "../../components/layouts/SecondaryContainer";
import { MODULES } from "../../constants";
import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import useWeather from "../../hooks/useWeather";
import useImages from "../../hooks/useImage";
import Loading from "../../components/Loading";

const CreateWeatherPage = () => {
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

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [formData, setFormData] = useState(null);
  const [existingWeatherLabels, setExistingWeatherLabels] = useState([]);
  const [editorFocus, setEditorFocus] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const { uploadImage, isLoading: isUploading } = useImages();
  const { createWeather, isLoading: isSaving } = useWeather();
  const weatherOptions = ["Cerah", "Mendung", "Berawan", "Hujan"];
  const url = `${import.meta.env.VITE_API_BASE_URL}/auth/admins/weathers`;
  const { data: weatherData, isLoading } = useSWR(url, async (url) =>
    fetcher(url, Cookies.get("token"))
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (weatherData && weatherData.data) {
          const labels = weatherData.data.map(
            (weather) => weather.weather_label
          );
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
  };

  const handleConfirmModal = async () => {
    const formPicture = new FormData();
    formPicture.append("pictures", selectedImageFile);
    const upload = await uploadImage(formPicture);
    if (upload.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Informasi cuaca gagal ditambahkan",
        title: "Informasi cuaca",
      });
      return;
    }

    // Save the image URL
    const imageUrl = upload.data.urls[0];
    const save = await createWeather({
      weather_title: formData.judul,
      weather_label: formData.label.label,
      weather_pictures: [
        {
          url: imageUrl,
        },
      ],
      weather_description: content,
    });
    if (save.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Informasi cuaca gagal ditambahkan",
        title: "Tambah Informasi cuaca",
      });
      return;
    }

    setShowModal({
      show: true,
      icon: "success",
      text: "Informasi cuaca berhasil ditambahkan",
      title: "Tambah Informasi cuaca",
    });
    reset();
    const updatedLabels = [...existingWeatherLabels, formData.label.label];
    setExistingWeatherLabels(updatedLabels);
    setIsConfirmModalOpen(false);
    setFormData(null);
  };

  const handleCancelModal = () => {
    setIsConfirmModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <SecondaryContainer
        backTo="/admin/weathers"
        title="Upload Informasi cuaca"
        className={"pe-3"}
      >
        <div className="mx-8">
          <div className="form-create">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label={"Judul"}
                autoComplete="off"
                placeholder="Masukkan Judul Peringatan"
                isError={errors.judul}
                message={
                  errors.judul && (
                    <span id="errors-judul-message">
                      <Info12Regular className="-mt-0.5" />{" "}
                      {errors.judul.message}
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

              <div className="flex justify-between mt-3">
                <div>
                  <label
                    className="text-body-sm font-semibold"
                    htmlFor="label"
                  >
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
                            id: `label-${option.toLowerCase()}`,
                          }))}
                        placeholder="Pilih Label"
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
                        message: "Label cuaca tidak boleh kosong",
                      },
                    }}
                  />

                  {errors.label && (
                    <p
                      className="text-error text-caption-lg mt-1 "
                      id="errors-label-message"
                    >
                      <span>
                        <Info12Regular className="-mt-0.5 mr-1" />
                      </span>
                      {errors.label?.message}
                    </p>
                  )}
                </div>

                <FileInput
                  id="gambar"
                  label="Masukkan Gambar"
                  value={gambar}
                  rules={{
                    required: true,
                    validate: {
                      lessThan1MB: (file) => file.size < 1000000,
                      acceptedFormats: (file) =>
                        ["image/jpeg", "image/png", "image/jpg"].includes(
                          file?.type
                        ),
                    },
                  }}
                  onChange={handleImageChange}
                  control={control}
                  name="gambar"
                  message={
                    <span id="errors-gambar-message">
                      <Info12Regular className="me-1.5" />
                      Wajib di isi maksimal 1MB, Hanya file berformat .JPG,
                      .JPEG, .PNG
                    </span>
                  }
                  isError={errors.gambar}
                />
              </div>
              <label
                htmlFor="deskripsi"
                className="text-body-lg font-semibold"
              >
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
                    <p
                      className="text-error text-caption-lg mt-1 "
                      id="errors-deskripsi-message"
                    >
                      <span>
                        <Info12Regular className="-mt-0.5 mr-1" />
                      </span>
                      {errors.deskripsi.message}
                    </p>
                  )}
                </div>
              </div>
              <ConfirmModal
                isOpen={isConfirmModalOpen}
                icon="info"
                text="Kamu yakin ingin menyimpan data cuaca ini?"
                title="Informasi Simpan Data Cuaca"
                cancelText="Batal"
                confirmText="Simpan"
                onConfirm={handleConfirmModal}
                onCancel={handleCancelModal}
                disabled={isUploading || isSaving}
                id="confirm-modal"
              />
              <NotifModal
                isOpen={showModal.show}
                title={showModal.title}
                text={showModal.text}
                icon={showModal.icon}
                confirmText="Tutup"
                onConfirm={() => {
                  setShowModal({
                    show: false,
                    icon: "",
                    text: "",
                    title: "",
                  });
                  navigate("/admin/weathers");
                }}
                id="notif-modal"
              />
              <div className="flex justify-end gap-x-3.5 pt-5">
                <Button
                  type="button"
                  size="md"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isUploading || isSaving}
                  isLoading={isUploading || isSaving}
                  id="btn-submit"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </SecondaryContainer>
    </>
  );
};

export default CreateWeatherPage;
