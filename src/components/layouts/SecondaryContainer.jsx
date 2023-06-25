import { ChevronLeftRegular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { ConfirmModal } from "../Modal";
import { useState } from "react";

export default function SecondaryContainer({
  children,
  title = "",
  backTo = "",
  className,
  ...props
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnClick = () => {
    if (
      location.pathname.includes("create") ||
      location.pathname.includes("update")
    ) {
      setIsModalOpen(true);
    } else {
      navigate(backTo);
    }
  };

  return (
    <div
      className={`${className} p-3 py-[54px] w-full pe-16`}
      {...props}
    >
      <div className="flex items-center gap-2.5 py-2.5 mb-8">
        <Link
          id="back-chevron-link"
          onClick={handleOnClick}
        >
          <ChevronLeftRegular
            id="back-chevron-icon"
            className="text-[32px] hover:text-info transition-colors duration-150"
          />
        </Link>
        <h4 className="text-h-4 font-bold">{title}</h4>
      </div>
      {children}
      <ConfirmModal
        cancelText={"Batal"}
        confirmText={"Keluar"}
        isOpen={isModalOpen}
        icon={"info"}
        title={"Informasi Belum Tersimpan"}
        text={
          "Kamu yakin ingin keluar tanpa menyimpan informasi yang sudah kamu buat?"
        }
        onConfirm={() => navigate(backTo)}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
