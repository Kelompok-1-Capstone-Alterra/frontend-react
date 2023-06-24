import { useState, useEffect } from "react";
import { Info12Regular } from "@fluentui/react-icons";
import { useForm, Controller } from "react-hook-form";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmModal, NotifModal } from "../../components/Modal";
import useSWR from "swr";
import FileInput from "../../components/FileInput";
import MySelect from "../../components/MySelect";
import { MODULES } from "../../constants";
import SecondaryContainer from "../../components/layouts/SecondaryContainer";
import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import useWeather from "../../hooks/useWeather";
import useImage from "../../hooks/useImage";
import Loading from "../../components/Loading";

const UpdateWeatherPage = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [editorFocus, setEditorFocus] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [formData, setFormData] = useState(null);
  const [weatherOptions, setWeatherOptions] = useState([]);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const { uploadImage, deleteImage, isLoading: isUploading } = useImage();
  const { updateWeather, isLoading: isSaving } = useWeather();
  const { fetchWeather } = useWeather();
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/auth/admins/weathers/${id}/detail`;
  const { data, isLoading } = useSWR(url, async (url) =>
    fetcher(url, Cookies.get("token"))
  );
  const weatherData = data?.data;

  const fetchWeatherData = async () => {
    if (weatherData) {
      setValue("judul", weatherData.weather_title);
      setValue("label", {
        label: weatherData.weather_label,
        value: weatherData.weather_label,
      });
      setValue("deskripsi", weatherData.weather_description);
      const fileName = weatherData.weather_pictures[0];
      const extension = weatherData.weather_pictures[0].split(".")[1];
      const file = new File(["defaultPicture"], fileName, {
        type: `image/${extension}`,
      });
      setValue("gambar", file);
    }
  };

  const fetchWeatherOptions = async () => {
    try {
      const fetchWeatherLabel = await fetchWeather();
      const existingLabels = fetchWeatherLabel.data.data.map(
        (option) => option.weather_label
      );

      const options = [
        { label: "Cerah", value: "Cerah" },
        { label: "Hujan", value: "Hujan" },
        { label: "Mendung", value: "Mendung" },
        { label: "Berawan", value: "Berawan" },
      ];

      const newOptions = options
        .filter(
          (option) =>
            !existingLabels.includes(option.value) ||
            option.value === weatherData?.weather_label
        )
        .map((option) => ({
          ...option,
          id: `label-${option.value.toLowerCase()}`,
        }));

      setWeatherOptions(newOptions);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    if (data) {
      fetchWeatherData();
      fetchWeatherOptions();
    }
  }, [data]);
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
    let imageUrl = weatherData.weather_pictures[0];
    if (selectedImageFile) {
      await deleteImage(weatherData.weather_pictures[0]);
      const formPicture = new FormData();
      formPicture.append("pictures", selectedImageFile);
      const upload = await uploadImage(formPicture);
      if (upload.status !== 200) {
        setShowModal({
          show: true,
          icon: "info",
          text: "Informasi Cuaca gagal ditambahkan",
          title: "Aksi Gagal",
        });
        return;
      }

      imageUrl = upload.data.urls[0];
    }
    // update
    const saveEdit = await updateWeather(id, {
      weather_title: formData.judul,
      weather_label: formData.label.label,
      weather_pictures: [
        {
          url: imageUrl,
        },
      ],
      weather_description: content,
    });

    if (saveEdit.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Informasi cuaca gagal di ubah",
        title: "Ubah Informasi cuaca",
      });
      return;
    }
    setShowModal({
      show: true,
      icon: "success",
      text: "Informasi cuaca berhasil di ubah",
      title: "Ubah Informasi cuaca",
    });
  };

  const handleCancelModal = () => {
    setIsConfirmModalOpen(false);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
  };
  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );

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
                  <span id="errors-judul-message">
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
                <label className="text-body-sm font-semibold" htmlFor="label">
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
                  <p
                    className="text-error text-caption-lg mt-1"
                    id="errors-label-message">
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
                  label="Masukkan Gambar"
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
                  control={control}
                  name="gambar"
                  value={watch("gambar")}
                  message={
                    <span id="errors-gambar-message">
                      <Info12Regular className="me-1.5" />
                      Wajib di isi maksimal 1MB, Hanya file berformat .JPG,
                      .JPEG, .PNG
                    </span>
                  }
                  isError={errors.gambar}
                  onChange={handleImageChange}
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
                  <p
                    className="text-error text-caption-lg mt-1 "
                    id="errors-deskripsi-message">
                    <span>
                      <Info12Regular className="-mt-0.5 mr-1" />
                    </span>
                    {errors.deskripsi.message}
                  </p>
                )}
              </div>
            </div>
            <ConfirmModal
              icon="info"
              isOpen={isConfirmModalOpen}
              text="Kamu yakin ingin mengubah data cuaca ini?"
              title="Informasi Ubah Data Cuaca"
              cancelText="Batal"
              confirmText="Ubah"
              onConfirm={handleConfirmModal}
              onCancel={handleCancelModal}
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
                type="submit"
                size="md"
                disabled={isUploading || isSaving}
                isLoading={isUploading || isSaving}
                id="btn-submit">
                Simpan
              </Button>
            </div>
          </form>
        </div>
      </SecondaryContainer>
    </>
  );
};

export default UpdateWeatherPage;
