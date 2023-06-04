import { useForm } from "react-hook-form";
import { IosArrowLtr24Filled, Info12Regular } from "@fluentui/react-icons";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { MODULES } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileInput from "../components/FileInput";
import { NotifModal, ConfirmModal } from "../components/Modal";
import SecondaryContainer from "../components/layouts/SecondaryContainer";

export default function CreateArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm();
  const [description, setDescription] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const navigate = useNavigate();

  const simpan = async (data) => {
    try {
      const thumbnail = data?.Thumbnail?.[0];

      const cleanedDescription = description.replace(/<\/?p>/g, "");

      const response = await axios.post(
        "https://647348bad784bccb4a3c6bcf.mockapi.io/products",
        {
          name: data.Judul,
          description: cleanedDescription,
          image: thumbnail,
        }
      );
      const id = response.data.id;
      if (response.status === 201) {
        setShowModal({
          show: true,
          icon: "success",
          text: "Artikel telah berhasil disimpan",
          title: "Tambah Artikel",
        });
      } else {
        setShowModal({
          show: true,
          icon: "info",
          text: "Artikel Gagal Disimpan",
          title: "Tambah Artikel",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Data error");
    }
  };

  const onSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  const handleDescriptionChange = (content) => {
    setDescription(content);
  };

  useEffect(() => {
    register("description");
  }, [register]);

  return (
    <SecondaryContainer
      backTo="/admin/articles"
      title="Tambah Artikel"
      className={"pe-3"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* judul Artikel */}
        <div className="ml-[103px] mb-[10px] w-[1142px]">
          <TextField
            id="title-article"
            label="Judul Artikel"
            autoComplete="off"
            isError={errors.Judul}
            placeholder="Tulis Judul Artikel"
            className="w-[1142px]"
            register={register("Judul", {
              required: "Judul harus diisi",
              minLength: {
                value: 5,
                message: "minim 5",
              },
            })}
            message={
              errors.Judul && (
                <span>
                  <Info12Regular className="-mt-0.5" /> {errors.Judul.message}
                </span>
              )
            }
          ></TextField>
        </div>
        {/* Input File */}
        <div className="ml-[103px] mb-[30px]">
          {!selectedImage && (
            <>
              <FileInput
                id="articleImageInput"
                label="Thumbnail"
                value={getValues("Thumbnail")}
                rules={{ required: true }}
                control={control}
                name="Thumbnail"
                message={
                  <span>
                    <Info12Regular className="me-1.5" />
                    Wajib di isi maksimal 1MB, Hanya file berformat .JPG, .JPEG,
                    .PNG
                  </span>
                }
                onChange={handleImageChange}
                isError={errors.Thumbnail}
              />
            </>
          )}
          {selectedImage && (
            <div className="content-center">
              <label
                htmlFor="thumbnail"
                className="block mb-1 text-body-sm font-semibold"
              >
                Thumbnail
              </label>
              <div className="border-dashed border-2 border-gray-300 rounded-md p-4 ">
                <div className="relative flex">
                  <img
                    src={selectedImage}
                    alt="Thumbnail"
                    className="w-[80px] h-[48px] mt-[16px] mb-[16px] ml-[16px]"
                  />
                  <p className="pt-[28px] pb-[28px] pl-[16px]">
                    {selectedImageFile.name}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ml-[103px] mb-[50px] w-[1142px] ">
          <p className="text-body-sm font-semibold lg:mb-1">Content</p>
          <ReactQuill
            label="Content"
            className="h-[294px]"
            theme="snow"
            modules={MODULES}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        {/* button */}
        <div className="flex justify-center items-center mb-5">
          <Button
            id="save-article"
            type="submit"
            variant={"green"}
            size="lg"
            className="rounded-full w-[914px]"
            onClick={handleSubmit(onSubmit)}
          >
            Simpan
          </Button>
        </div>
        <ConfirmModal
          cancelText={"Kembali"}
          title={"Simpan Artikel"}
          text={"Apakah Anda Ingin Menambah Artikel ?"}
          confirmText={"Simpan"}
          icon={"info"}
          isOpen={isConfirmModalOpen}
          onCancel={() => {
            setIsConfirmModalOpen(false);
          }}
          onConfirm={() => {
            setIsConfirmModalOpen(false);
            simpan(getValues());
          }}
        />
        <NotifModal
          title={showModal.title}
          text={showModal.text}
          icon={showModal.icon}
          confirmText={"Tutup"}
          isOpen={showModal.show}
          onConfirm={() => {
            setShowModal({
              show: false,
              icon: "",
              text: "",
              title: "",
            });
            navigate("/admin/articles");
          }}          
        />
        <div
          className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
            isConfirmModalOpen || showModal.show ? "block" : "hidden"
          } cursor-pointer top-0 bottom-0 left-0 right-0`}
        ></div>
      </form>
    </SecondaryContainer>
  );
}
