import { useForm } from "react-hook-form";
import { IosArrowLtr24Filled, Info12Regular } from "@fluentui/react-icons";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { MODULES } from "../constants";
import axios from "axios";
import FileInput from "../components/FileInput";
import { useParams } from "react-router-dom";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import { ConfirmModal, NotifModal } from "../components/Modal";
import { useNavigate } from "react-router-dom";

export default function UpdateArticle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm();
  const [artikelList, setArtikelList] = useState({});
  const [editedDescription, setEditedDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    axios
      .get(`https://647348bad784bccb4a3c6bcf.mockapi.io/products/${id}`)
      .then((response) => {
        setArtikelList(response.data);
        setEditedDescription(response.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const thumbnail = data?.Thumbnail?.[0];

      const cleanedDescription = editedDescription.replace(/<\/?p>/g, "");

      const response = await axios.put(
        `https://647348bad784bccb4a3c6bcf.mockapi.io/products/${id}`,
        {
          name: data.Judul,
          description: cleanedDescription,
          image: thumbnail,
        }
      );
      if (response.status === 200) {
        setShowModal({
          show: true,
          icon: "success",
          title: "Edit Artikel",
          text: "Artikel berhasil di Update",
        });
      } else {
        setShowModal({
          show: true,
          icon: "info",
          title: "Edit Artikel",
          text: "Artikel gagal di Update",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Data error");
    }
  };

  const handleDescriptionChange = (content) => {
    setEditedDescription(content);
  };

  const notif = () => {
    setIsConfirmModalOpen(true);
  };

  useEffect(() => {
    register("description");
  }, [register]);

  return (
    <SecondaryContainer
      backTo="/admin/articles"
      title="Update Artikel"
      className={"pe-3"}
    >
      <form onSubmit={handleSubmit(notif)}>
        {/* judul Artikel */}
        <div className="ml-[103px] mb-[10px] w-[1142px]">
          <TextField
            id="title-article"
            label="Judul Artikel"
            autoComplete="off"
            isError={errors.Judul}
            placeholder="Tulis Judul Artikel"
            defaultValue={artikelList.name}
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
        <div className="ml-[103px] mb-[30px] w-[1142px]">
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
            id="content-input"
            className="h-[294px]"
            theme="snow"
            modules={MODULES}
            value={editedDescription}
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
            onClick={handleSubmit(notif)}
          >
            Simpan
          </Button>
        </div>
        <ConfirmModal
          cancelText={"Kembali"}
          title={"Update Artikel"}
          text={"Apakah Anda yakin mengupdate artikel ini?"}
          confirmText={"Simpan"}
          icon={"info"}
          isOpen={isConfirmModalOpen}
          onCancel={() => {
            setIsConfirmModalOpen(false);
          }}
          onConfirm={() => {
            setIsConfirmModalOpen(false);
            onSubmit(getValues());
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
