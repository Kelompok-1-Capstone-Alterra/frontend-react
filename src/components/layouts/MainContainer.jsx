import AdminImage from "./../../assets/Admin Image.png";
import { SignOut24Regular } from "@fluentui/react-icons";

export default function MainContainer({ children }) {
  return (
    <div className="px-[55px] py-[54px] w-full">
      <div className="flex justify-between items-center">
        <p>
          <span className="pe-1.5 border-e border-black">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="ps-1.5">
            {new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
        <div className="flex gap-5 bg-[#F9FAFB] p-2.5">
          <div className="flex items-center gap-2.5">
            <img
              src={AdminImage}
              className="w-9 rounded-lg"
              alt=""
            />
            <p className="font-semibold text-body-sm">Admin</p>
          </div>
          <button className="flex items-center gap-2">
            <SignOut24Regular />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
