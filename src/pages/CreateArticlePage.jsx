import { useForm, useWatch } from "react-hook-form";
import { Info12Regular, DismissCircle24Filled } from "@fluentui/react-icons";
import Cookies from "js-cookie";
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

export default function CreateArticlPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    setValue,
    watch,
    control,
  } = useForm();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [editorFocus, setEditorFocus] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    register("description", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue("description", editorState);
    trigger("description");
  };

  let editorContent = watch("description");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const navigate = useNavigate();

  const saveData = async (data) => {
    setIsLoading(true);
    try {
      //upload the image
      const formData = new FormData();
      formData.append("pictures", selectedImageFile);
      const responseUpload = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/pictures`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //save the image url
      console.log(responseUpload);
      const imageUrl = responseUpload.data.urls[0];
      console.log(imageUrl);

      //save the article
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/articles/add`,
        {
          article_title: data.article_title,
          article_pictures: [
            {
              url: imageUrl,
            },
          ],
          article_description: data.description,
          article_view: 0,
          article_like: 0,
          admin_id: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setShowModal({
        show: true,
        icon: "success",
        text: "Artikel telah berhasil disimpan",
        title: "Tambah Artikel",
      });
    } catch (error) {
      console.log(error);
      setShowModal({
        show: true,
        icon: "info",
        text: "Artikel Gagal Disimpan",
        title: "Tambah Artikel",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  const handleImageDissmiss = () => {
    setSelectedImage(null);
    setSelectedImageFile(null);
  };

  return (
    <SecondaryContainer
      backTo="/admin/articles"
      title="Tambah Artikel"
      className={"pe-3"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-8"
      >
        {/* judul Artikel */}
        <div className="mb-2.5">
          <TextField
            id="article-title"
            label="Judul Artikel"
            autoComplete="off"
            isError={errors.article_title}
            placeholder="Tulis Judul Artikel"
            className="w-[1142px]"
            register={register("article_title", {
              required: "Judul tidak boleh kosong",
            })}
            message={
              errors.article_title && (
                <span>
                  <Info12Regular className="-mt-0.5" />{" "}
                  {errors.article_title.message}
                </span>
              )
            }
          ></TextField>
        </div>
        {/* Input File */}
        <div className="mb-7">
          <>
            <FileInput
              id="article-image"
              label="Thumbnail"
              value={useWatch({
                name: "article_image",
                control: control,
              })}
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
              className={`${selectedImage ? "hidden" : "block"}`}
              name="article_image"
              message={
                <p className="text-caption-lg">
                  <Info12Regular className="-mt-0.5 me-1" />
                  <span>
                    Wajib di isi maksimal 1MB, Hanya file berformat .JPG, .JPEG,
                    .PNG
                  </span>
                </p>
              }
              onChange={handleImageChange}
              isError={errors.article_image}
            />
          </>
          {selectedImage && (
            <>
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
                    <div className="flex justify-center items-center absolute right-0 h-full">
                      <DismissCircle24Filled
                        className="text-neutral-40 hover:text-neutral-60 cursor-pointer"
                        onClick={handleImageDissmiss}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {errors.article_image && (
                <div className="text-error text-caption-lg mt-1">
                  <Info12Regular className="-mt-0.5 me-1" />
                  <span>
                    Wajib di isi maksimal 1MB, Hanya file berformat .JPG, .JPEG,
                    .PNG
                  </span>
                </div>
              )}
            </>
          )}
        </div>
        <div className="">
          <p className="text-body-sm font-semibold lg:mb-1">Content</p>
          <ReactQuill
            theme="snow"
            id="article_description"
            value={editorContent}
            onChange={onEditorStateChange}
            modules={MODULES}
            placeholder="Masukkan deskripsi produk"
            className={`h-[306px] ${
              editorFocus && !errors.description ? "ql-focus" : null
            } ${errors.description ? "ql-error" : null}`}
            onFocus={() => {
              setEditorFocus(true);
            }}
            onBlur={() => {
              setEditorFocus(false);
            }}
          />
          <div className="mt-12"></div>
          {errors.description && (
            <p
              className="text-error text-caption-lg"
              id="error-image-message"
            >
              <Info12Regular className="-mt-0.5" /> Content tidak boleh kosong
            </p>
          )}
        </div>

        {/* submit button */}
        <div className="flex w-full justify-end items-center">
          <Button
            id="save-article"
            type="submit"
            variant={"green"}
            size="md"
            disabled={isLoading}
            className={"rounded-full"}
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
            saveData(getValues());
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
