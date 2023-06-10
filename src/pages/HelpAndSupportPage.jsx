import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { MODULES } from "../constants";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import { Info12Regular } from "@fluentui/react-icons";
import { useState,useEffect } from "react";
import axios from "axios";


export default function HelpAndSupport() {
  const [editorFocus, setEditorFocus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    trigger,
    setValue,
  } = useForm();

  useEffect(() => {
    register("support", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue("support", editorState);
    trigger("support");
  };

  let editorContent = watch("support");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://647348bad784bccb4a3c6bcf.mockapi.io/help", {
        name: data.user_name,
        email: data.user_email,
        support: data.support
      });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SecondaryContainer
      backTo="/admin/helpsupport"
      title="Saran Dan Bantuan"
      className={"pe-3"}
    >
      <form onSubmit={handleSubmit} className="px-8">
        <div className="mb-2.5">
          <TextField
            id=""
            label="Name"
            autoComplete="off"
            isError={errors.user_name}
            placeholder="Nama User"
            className="w-[1142px]"
            register={register("user_name", {
              required: "Nama tidak boleh kosong",
            })}
            message={
              errors.user_name && (
                <span>
                  <Info12Regular className="-mt-0.5" />{" "}
                  {errors.user_name.message}
                </span>
              )
            }
          ></TextField>
        </div>
        <div className="mb-2.5">
          <TextField
            id=""
            label="Email"
            autoComplete="off"
            isError={errors.user_email}
            placeholder="Nama User"
            className="w-[1142px]"
            register={register("user_email", {
              required: "Email tidak boleh kosong",
            })}
            message={
              errors.user_email && (
                <span>
                  <Info12Regular className="-mt-0.5" />{" "}
                  {errors.user_email.message}
                </span>
              )
            }
          ></TextField>
        </div>
        <div className="">
          <p className="text-body-sm font-semibold lg:mb-1">Message</p>
          <ReactQuill
            theme="snow"
            id=""
            value={editorContent}
            onChange={onEditorStateChange}
            modules={MODULES}
            placeholder="Masukkan deskripsi produk"
            className={`h-[306px] ${
              editorFocus && !errors.support ? "ql-focus" : null
            } ${errors.support ? "ql-error" : null}`}
            onFocus={() => {
              setEditorFocus(true);
            }}
            onBlur={() => {
              setEditorFocus(false);
            }}
          />
          <div className="mt-12"></div>
          {errors.support && (
            <p
              className="text-error text-caption-lg"
              id="error-image-message"
            >
              <Info12Regular className="-mt-0.5" /> Saran Tidak Boleh Kosong
            </p>
          )}
        </div>
        <div className="flex w-full justify-end items-center">
          <Button
            id="save-article"
            type="submit"
            variant={"green"}
            size="md"
            className={"rounded-full"}
            onClick={handleSubmit(onSubmit)}
          >
            Simpan
          </Button>
        </div>
      </form>
    </SecondaryContainer>
  );
}
