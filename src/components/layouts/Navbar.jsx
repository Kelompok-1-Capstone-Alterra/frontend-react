import Button from "../Button";
import Logo from "../../assets/Logo.png";

export default function Navbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between px-32 py-[18px] bg-white">
      <div className="flex items-center gap-2">
        <img src={Logo} className="w-10" />
        <p className="text-2xl font-bold text-primary">Agriplant</p>
      </div>
      <div className="flex gap-[10px]">
        <Button
          variant={"outline-green"}
          className={"rounded-full btn-sm h-[37px] py-2 px-[10px] w-[105px]"}
        >
          Download
        </Button>
        <Button
          variant={"green"}
          className={"rounded-full btn-sm h-[37px] py-2 px-[10px]  w-[105px]"}
        >
          Login
        </Button>
      </div>
    </nav>
  );
}
