import TextField from "../components/TextField";
import { IosArrowLtr24Filled } from "@fluentui/react-icons";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";

export default function CreateArticle() {
  const [value, setValue] = useState("");

  return (
    <>
      {/* title */}
      <div className="ml-[103px] mt-[78px] mb-[48px] flex">
        <h1 className="font-bold text-h-4 font-bold">
          <IosArrowLtr24Filled /> Tambah Artikel
        </h1>
      </div>
      {/* judul Artikel */}
      <div className="ml-[103px] mb-[30px] w-[1142px]">
        <TextField
          label="Judul Artikel"
          placeholder="Tulis Judul Artikel"
          className="w-[1142px] mb-[20px]"
        ></TextField>
      </div>

      {/* Tags */}
      <div
        data-te-chips-init=""
        data-te-chips-placeholder=""
        className="ml-5 mb-0 h-[100px] border w-[10rem] pb-0 shadow-none outline-none transition-all duration-300 ease-cubic-bezier hover:cursor-text"
      />

      {/* Input File */}
      <label className="label ml-[103px]">
        <span className=" text-body-sm font-semibold">Thumbail</span>
      </label>
      <div className="ml-[103px] mb-[30px] border-dashed border-b ">
        <input
          type="file"
          className="file-input file-input-bordered file-input-success w-full max-w-xs"
        />
      </div>

      {/* text editor */}
      <div className="ml-[103px] mb-[50px] w-[1142px] ">
        <ReactQuill
          className="h-[294px]"
          theme="snow"
          value={value}
          onChange={() => setValue(e.target.value)}
        />
      </div>

      {/* button */}
     
        <Button variant={"green"} size="lg" className="rounded-full flex justify-center items-center">
          Simpan
        </Button>
    </>
  );
}
