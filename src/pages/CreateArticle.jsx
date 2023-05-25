import TextField from "../components/TextField";
import { IosArrowLtr24Filled } from "@fluentui/react-icons";

export default function CreateArticle() {
  return (
    <>
      {/* title */}
      <div className="ml-[103px] mt-[78px] mb-[48px] flex">
        <h1 className="font-bold text-h-4 font-bold">
          <IosArrowLtr24Filled /> Tambah Artikel
        </h1>
      </div>
      {/* judul Artikel */}
      <div className="ml-[103px] mb-[30px]">
        <TextField
          label="Judul Artikel"
          placeholder="Tulis Judul Artikel"
          className="w-[1142px] mb-[20px]"
        ></TextField>
      </div>

      {/* Tags */}
      <div className="ml-[103px] mb-[30px]">
        <TextField
          label="Tags"
          placeholder="Masukan Tags"
          className="w-[1142px] mb-[20px]"
        ></TextField>
      </div>
      {/* Input File */}
      <label className="label ml-[103px]">
        <span className=" text-body-sm font-semibold">Thumbail</span>
      </label>
      <div className="ml-[103px] mb-[30px] border-dashed border-1 ">
        <input
          type="file"
          className="file-input file-input-bordered file-input-success w-full max-w-xs"
        />
      </div>
    </>
  );
}
