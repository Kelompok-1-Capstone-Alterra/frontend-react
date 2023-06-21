import { useForm } from "react-hook-form";
import { Info12Regular } from "@fluentui/react-icons";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { MODULES } from "../constants";
import { useNavigate } from "react-router-dom";
import FileInput from "../components/FileInput";
import { NotifModal, ConfirmModal } from "../components/Modal";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import useImages from "../hooks/useImage";
import useArticle from "../hooks/useArticle";
import useSWR from "swr";
import Cookies from "js-cookie";
import fetcher from "../utils/fetcher";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

export default function UpdateArticlePage() {
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
  const { id } = useParams();
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [editorFocus, setEditorFocus] = useState(false);
  const { uploadImage, getImage, isLoading: isUploading } = useImages();
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const { updateArticle, isLoading: isUpdating } = useArticle();
  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admins/articles/${id}/detail`,
    (url) => fetcher(url, Cookies.get("token"))
  );

  const article = data?.data;

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

  const fetchArticleData = async () => {
    try {
      if (article) {
        setValue("article_title", article.article_title);
        setValue("description", article.article_description);
        const response = await getImage(article.article_pictures[0]);
        if (response.status === 200) {
          const fileName = `artikel.${response.data.type.split("/")[1]}`;
          const file = new File([response.data], fileName, {
            type: response.data.type,
          });
          setValue("article_image", file);
          setSelectedImageFile(response.data);
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchArticleData();
  }, [article]);

  const saveData = async (data) => {
    const formPicture = new FormData();
    formPicture.append("pictures", selectedImageFile);
    const upload = await uploadImage(formPicture);
    if (upload.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Data artikel kamu gagal disimpan",
        title: "Aksi Gagal",
      });
      return;
    }
    //save the image url
    const imageUrl = upload.data.urls[0];
    // update
    const save = await updateArticle(id, {
      article_title: data.article_title,
      article_pictures: [
        {
          url: imageUrl,
        },
      ],
      article_description: data.description,
    });

    if (save.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Data artikel kamu gagal disimpan",
        title: "Aksi Gagal",
      });
      return;
    }
    setShowModal({
      show: true,
      icon: "success",
      text: "Artikel berhasil di edit",
      title: "Edit Artikel",
    });
  };

  const onSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  if (error) navigate("/admin/articles");

  return (
    <SecondaryContainer
      backTo="/admin/articles"
      title="Edit Artikel"
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
              required: "Judul artikel tidak boleh kosong",
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
        <div className="mb-5">
          <>
            <FileInput
              id="article-image"
              label="Gambar Artikel"
              value={watch("article_image")}
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
              onChange={(e) => {
                setSelectedImageFile(e.target.files[0]);
              }}
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
              isError={errors.article_image}
            />
          </>
        </div>
        <div>
          <p className="text-body-sm font-semibold lg:mb-1">Deskripsi</p>
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
              <Info12Regular className="-mt-0.5" /> Deskripsi tidak boleh kosong
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
            disabled={isUploading || isUpdating}
            isLoading={isUploading || isUpdating}
            className={"rounded-full"}
          >
            Simpan
          </Button>
        </div>

        <ConfirmModal
          cancelText={"Batal"}
          title={"Informasi Ubah Data Artikel"}
          text={"Kamu yakin ingin mengubah data artikel ini?"}
          confirmText={"Ubah"}
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
      </form>
    </SecondaryContainer>
  );
}
