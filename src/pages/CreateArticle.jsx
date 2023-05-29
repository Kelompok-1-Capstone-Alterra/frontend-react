import { useForm } from "react-hook-form";
import { IosArrowLtr24Filled } from "@fluentui/react-icons";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import TextField from "../components/TextField";
import MainContainer from "../components/layouts/MainContainer";
import { MODULES } from "../MODULES";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function CreateArticle() {
  const { register, handleSubmit,error } = useForm();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();




  const onSubmit = async (data) => {
    try {
      const cleanedDescription = description.replace(/<\/?p>/g, "");

      const response = await axios.post(
        "https://647348bad784bccb4a3c6bcf.mockapi.io/products",
        {
          id: data.id,
          name: data.name,
          description: cleanedDescription,
          image: data.thumbnail[0]?.name,
        }
        
      );
      if (response.status === 201) {
        alert("Data saved successfully!");
        navigate(`/admin/articles/${data.id}`);
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while saving data.");
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
          isError={error.name}
          placeholder="Tulis Judul Artikel"
          className="w-[1142px] mb-[20px]"
          register={register('name', {
            required: 'Judul harus diisi',
            minLength: {
              value: 5,
              message: 'minim 5',
            },
          })}
          message={
            error.name && (
              <span>
                <Info12Regular className="-mt-0.5" /> {errors.name.message}
              </span>
            )
          }
        ></TextField>
      </div>
      
      {/* Tags */}
      <label className="label ml-[103px]">
        <span className=" text-body-sm font-semibold">Tags</span>
      </label>
      <div className="ml-[103px] mb-[30px] w-[1142px] border">
        <span
          id="badge-dismiss-dark"
          className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
        >
          Dark
          <button
            type="button"
            className="inline-flex items-center p-0.5 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
            data-dismiss-target="#badge-dismiss-dark"
            aria-label="Remove"
          >
            <svg
              aria-hidden="true"
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        </span>
      </div>

      {/* Input File */}
      <label className="label ml-[103px]">
        <span className=" text-body-sm font-semibold">Thumbnail</span>
      </label>
      <div className="ml-[103px] mb-[30px] border-dashed">
        <input
          type="file"
          className="file-input file-input-bordered file-input-success w-full max-w-xs"
          {...register("thumbnail")}
        />
      </div>

      {/* text editor */}
      <div className="ml-[103px] mb-[50px] w-[1142px] ">
        <ReactQuill
          className="h-[294px]"
          theme="snow"
          modules={MODULES}
          value={description}
          onChange={handleDescriptionChange}
        />
        <input type="hidden" name="description" value={description} />
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
  );
}
