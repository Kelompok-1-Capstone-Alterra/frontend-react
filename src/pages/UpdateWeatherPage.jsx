import { useState, useEffect } from "react";
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
import Cookies from "js-cookie";
import fetcher from "../utils/fetcher";
import useWeather from "../hooks/useWeather";
import useImage from "../hooks/useImage";

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
  const { uploadImage } = useImage();
  const { fetchWeather } = useWeather();
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/auth/admins/weathers/${id}/detail`;
  const { data } = useSWR(url, async (url) =>
    fetcher(url, Cookies.get("token"))
  );
  const weatherData = data?.data;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (weatherData) {
          setValue("judul", weatherData.weather_title);
          setValue("label", {
            label: weatherData.weather_label,
            value: weatherData.weather_label,
          });
          setValue("deskripsi", weatherData.weather_description);
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/pictures/${
              weatherData.weather_pictures[0]
            }`,
            {
              responseType: "blob",
            }
          );
          const blob = new Blob([response.data], { type: response.data.type });
          const fileName = `${weatherData.weather_label}.png`; // Nama file bedasarkan label

          const file = new File([blob], fileName, { type: response.data.type });

          setValue("gambar", file);
          setSelectedImageFile(blob);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
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
        const newOptions = options.filter(
          (option) =>
            !existingLabels.includes(option.value) ||
            option.value === weatherData?.weather_label
        );
        setWeatherOptions(newOptions);
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    fetchWeatherData();
    fetchWeatherOptions();
  }, [weatherData]);
  // images

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

    //save the image url
    const imageUrl = upload.data.urls[0];
    // update
    const saveEdit = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/auth/admins/weathers/${id}`,
      {
        weather_title: formData.judul,
        weather_label: formData.label.label,
        weather_pictures: [
          {
            url: imageUrl,
          },
        ],
        weather_description: content,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (saveEdit.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Informasi Cuaca gagal diedit",
        title: "Aksi Gagal",
      });
      return;
    }
    setShowModal({
      show: true,
      icon: "success",
      text: "Informasi cuaca berhasil di edit",
      title: "Informasi cuaca",
    });
  };

  const handleCancelModal = () => {
    setIsConfirmModalOpen(false);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
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
                isConfirmModalOpen || showModal.show ? "block" : "hidden"
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
              />
            </div>
            <div className="flex justify-end gap-x-3.5 pt-5">
              <Button type="submit" size="md">
                Kirim
              </Button>
            </div>
          </form>
        </div>
      </SecondaryContainer>
    </>
  );
};

export default UpdateWeatherPage;
