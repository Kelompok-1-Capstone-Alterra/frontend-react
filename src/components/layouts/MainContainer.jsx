import { useState, useEffect } from "react";
import { SignOut24Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import AdminImage from "./../../assets/Admin Image.png";

export default function MainContainer({ children }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("admin");
    navigate("/login");
  };

  return (
    <div className="px-[55px] py-[54px] w-full">
      <div className="flex justify-between items-center mb-7">
        <p className="text-body-lg">
          <span className="pe-1.5 border-e border-black">
            {date.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="ps-1.5">
            {date.toLocaleTimeString("id-ID", {
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
          <button
            className="flex items-center gap-2"
            onClick={handleLogOut}
          >
            <SignOut24Regular />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
