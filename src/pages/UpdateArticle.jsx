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

export default function UpdateArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm();
  const [productList, setProductList] = useState({});
  const [editedDescription, setEditedDescription] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://647348bad784bccb4a3c6bcf.mockapi.io/products/${id}`)
      .then((response) => {
        setProductList(response.data);
        setEditedDescription(response.data.description)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const cleanedDescription = editedDescription.replace(/<\/?p>/g, "");

      const response = await axios.put(
        `https://647348bad784bccb4a3c6bcf.mockapi.io/products/${id}`,
        {
          name: data.Judul,
          description: cleanedDescription,
          image: data.Thumbnail[0],
        }
      );
      alert("Data saved successfully!");
    } catch (error) {
      console.log(error);
      alert("Data error");
    }
  };

  const handleDescriptionChange = (content) => {
    setEditedDescription(content);
  };

  useEffect(() => {
    register("description");
  }, [register]);

  return (
    <SecondaryContainer>
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
          defaultValue={productList.name}
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
          value={editedDescription}
          onChange={handleDescriptionChange}

        />
        
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
    </form>
    </SecondaryContainer>
  );
}
