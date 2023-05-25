import Logo from "../../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-12 py-[18px] bg-white">
      <div className="flex items-center gap-2">
        <img src={Logo} className="w-10" />
        <p className="text-2xl font-bold text-primary">Agriplant</p>
      </div>
      <p className="text-[#6B7280] font-semibold">
        @2023. Kelompok 1 Alterra Academy Batch 4
      </p>
    </footer>
  );
}
