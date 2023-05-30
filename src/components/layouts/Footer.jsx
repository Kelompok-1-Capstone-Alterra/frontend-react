import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-12 py-[18px] bg-white">
      <Link to={"/"}>
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            className="w-10"
          />
          <p className="text-h-6 font-bold text-primary">Agriplant</p>
        </div>
      </Link>
      <p className="text-[#6B7280] font-semibold">
        @2023. Kelompok 1 Alterra Academy Batch 4
      </p>
    </footer>
  );
}
