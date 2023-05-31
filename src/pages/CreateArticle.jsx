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
import { NotifModal } from "../components/Modal";

export default function CreateArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    
  } = useForm();
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const cleanedDescription = description.replace(/<\/?p>/g, "");
      

      const response = await axios.post(
        "https://647348bad784bccb4a3c6bcf.mockapi.io/products",
        {
          name: data.Judul,
          description: cleanedDescription,
          image: data.Thumbnail[0],
        }
        );
      const id = response.data.id; 
      if (response.status === 201) {
        setShowModal({
          show: true,
          icon: "success",
          text: "Artikel Telah Berhasil Disimpan",
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

  const handleDescriptionChange = (content) => {
    setDescription(content);
  };

  useEffect(() => {
    register("description");
  }, [register]);

  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* title */}
      <div className="ml-[103px] mt-[78px] mb-[48px] flex">
        <h1 className="font-bold text-h-4 font-bold">
          <IosArrowLtr24Filled /> Tambah Artikel
        </h1>
      </div>
      {/* judul Artikel */}
      <div className="ml-[103px] mb-[10px] w-[1142px]">
        <TextField
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
              Wajib di isi maksimal 1MB, Hanya file berformat .JPG, .JPEG, .PNG
            </span>
          }
          isError={errors.Thumbnail}
        />
      </div>
      <div className="ml-[103px] mb-[50px] w-[1142px] ">
        <ReactQuill
          className="h-[294px]"
          theme="snow"
          modules={MODULES}
          value={description}
          onChange={handleDescriptionChange}
        />
        <input type="hidden" name="description" value={description} required />
      </div>
      {/* button */}
      <div className="flex justify-center items-center mb-5">
        <Button
          type="submit"
          variant={"green"}
          size="lg"
          className="rounded-full w-[914px]"
          onClick={handleSubmit(onSubmit)}
        >
          Simpan
        </Button>
      </div>
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
              reset();
              navigate("/admin/products");
            }}
          />
    </form>
  );
}
