import { useForm, useWatch } from "react-hook-form";
import {
  Info12Regular,
  DismissCircle24Filled,
  ArrowCounterclockwise24Filled,
} from "@fluentui/react-icons";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { MODULES } from "../constants";
import { useNavigate, useLoaderData, Navigate } from "react-router-dom";
import FileInput from "../components/FileInput";
import { NotifModal, ConfirmModal } from "../components/Modal";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import useImage from "../hooks/useImage";
import useArticle from "../hooks/useArticle";
import axios from "axios";

export default function UpdateArticlePage() {
  const article = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    setValue,
    clearErrors,
    watch,
    control,
  } = useForm({
    defaultValues: {
      article_title: article?.article_title ? article.article_title : "",
      description: article?.article_description
        ? article.article_description
        : "",
    },
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [selectedImage, setSelectedImage] = useState(
    `${import.meta.env.VITE_API_BASE_URL}/pictures/${
      article?.article_pictures[0]
    }`
  );
  const [editorFocus, setEditorFocus] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const { uploadImage, isLoading: isImageLoading } = useImage();
  const { updateArticle, isLoading: isArticleLoading } = useArticle();

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

  const navigate = useNavigate();

  if (article === null) {
    return <Navigate to="/admin/articles" />;
  }

  useEffect(() => {
    trigger("article_image");
  }, [selectedImage]);

  const saveData = async (data) => {
    const picture = [];
    if (selectedImageFile) {
      const formData = new FormData();
      formData.append("pictures", selectedImageFile);
      const res = await uploadImage(formData);
      if (res.status !== 200) {
        setShowModal({
          show: true,
          icon: "info",
          text: "Data artikel kamu gagal diubah",
          title: "Aksi Gagal",
        });
        return;
      }
      picture.push({
        url: res.data.urls[0],
      });
    } else {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/pictures/${
          article?.article_pictures[0]
        }`,
        {
          responseType: "blob",
        }
      );

      const file = new File([response.data], "oldImage.jpg", {
        type: response.data.type,
      });

      const formData = new FormData();
      formData.append("pictures", file);
      const res = await uploadImage(formData);
      if (res.status !== 200) {
        setShowModal({
          show: true,
          icon: "info",
          text: "Data artikel kamu gagal diubah",
          title: "Aksi Gagal",
        });
        return;
      }
      picture.push({
        url: res.data.urls[0],
      });
    }

    const body = {
      article_title: data.article_title,
      article_description: data.description,
      article_pictures: picture,
    };

    const response = await updateArticle(article.id, body);
    if (response.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Data artikel kamu gagal diubah",
        title: "Aksi Gagal",
      });
      return;
    }
    setShowModal({
      show: true,
      icon: "success",
      text: "Data artikel kamu berhasil diubah",
      title: "Ubah Data Artikel",
    });
  };

  const onSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  const handleImageDissmiss = () => {
    setValue("article_image", null);
    setSelectedImageFile(null);
    setSelectedImage(null);
    clearErrors("article_image");
  };

  return (
    <SecondaryContainer
      backTo="/admin/articles"
      title="Update Artikel"
      className={"pe-3"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-8"
      >
        {/* judul Artikel */}
        <div className="mb-5">
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
          />
        </div>
        {/* Input File */}
        <div className="mb-5">
          <>
            <div
              className={`${
                selectedImage ? "hidden" : "block"
              } flex items-center gap-2 `}
            >
              <FileInput
                id="article-image"
                label="Thumbnail"
                value={useWatch({
                  name: "article_image",
                  control: control,
                })}
                rules={{
                  validate: {
                    lessThan1MB: (file) => {
                      if (!file) return true;
                      return file.size < 1000000;
                    },
                    acceptedFormats: (file) => {
                      if (!file) return true;
                      return ["image/jpeg", "image/png", "image/jpg"].includes(
                        file?.type
                      );
                    },
                    selectedImageRequired: () => {
                      if (!selectedImage) return false;
                      return true;
                    },
                  },
                  onChange: (event) => {
                    const file = event.target.value;
                    if (file) {
                      setSelectedImageFile(file);
                      setSelectedImage(URL.createObjectURL(file));
                    } else {
                      setSelectedImageFile(null);
                      setSelectedImage(null);
                    }
                  },
                }}
                control={control}
                name="article_image"
                message={
                  <p className="text-caption-lg">
                    <Info12Regular className="-mt-0.5 me-1" />
                    <span>
                      Wajib di isi maksimal 1MB, Hanya file berformat .JPG,
                      .JPEG, .PNG
                    </span>
                  </p>
                }
                // onChange={handleImageChange}
                isError={errors.article_image}
              />
              <ArrowCounterclockwise24Filled
                className="text-primary"
                onClick={() => {
                  clearErrors("article_image");
                  setSelectedImage(
                    `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                      article?.article_pictures[0]
                    }`
                  );
                }}
              />
            </div>
          </>
          {selectedImage && (
            <>
              <div className="content-center">
                <label
                  htmlFor="thumbnail"
                  className="block mb-1 text-body-sm font-semibold cursor-pointer"
                >
                  Thumbnail
                </label>
                <div className="border-dashed border-2 border-gray-300 rounded-md p-4 ">
                  <div className="relative flex items-center">
                    <div className="h-[100px]">
                      <img
                        src={selectedImage}
                        alt="Thumbnail"
                        className="object-fill w-full h-full"
                      />
                    </div>

                    {selectedImageFile?.name && (
                      <p className="ps-6">{selectedImageFile.name}</p>
                    )}

                    <div className="flex justify-center items-center absolute right-0 h-full">
                      <DismissCircle24Filled
                        className="text-neutral-40 hover:text-neutral-60 cursor-pointer"
                        onClick={handleImageDissmiss}
                      />
                    </div>
                  </div>
                </div>
                {errors.article_image && (
                  <div className="text-error text-caption-lg mt-1">
                    <Info12Regular className="-mt-0.5 me-1" />
                    <span>
                      Wajib di isi maksimal 1MB, Hanya file berformat .JPG,
                      .JPEG, .PNG
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div>
          <p className="text-body-sm font-semibold lg:mb-1">Konten</p>
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
        {/* button */}
        <div className="flex w-full justify-end items-center">
          <Button
            id="save-article"
            type="submit"
            variant={"green"}
            size="md"
            disabled={isImageLoading || isArticleLoading}
            className="rounded-full"
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
