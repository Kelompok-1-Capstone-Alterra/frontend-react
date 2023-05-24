import TextField from "../components/TextField"
import { IosArrowLtr24Filled} from "@fluentui/react-icons";


export default function CreateArticle() {
  return (
    <>
      {/* title */}
      <div className="ml-[103px] mt-[78px] mb-[48px] flex">
        <h1 className="font-bold text-h-4 font-bold"><IosArrowLtr24Filled/> Tambah Artikel</h1>
      </div>
      <div className="ml-[103px]">
        <TextField label = "Judul Artikel" placeholder="Tulis Judul Artikel" className="w-[1094px] mb-[34px]"></TextField>
      </div>
    </>
  );
}
