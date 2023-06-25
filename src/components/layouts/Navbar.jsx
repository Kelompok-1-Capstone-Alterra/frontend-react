import Button from "../Button";
import Logo from "../../assets/img/Logo.png";
import { Link } from "react-router-dom";
import { APPLICATION_DOWNLOAD_LINK } from "../../constants";

export default function Navbar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between px-12 py-[18px] bg-white">
      <Link to={"/"}>
        <div
          className="flex items-center gap-2"
          id="logo-button"
        >
          <img
            src={Logo}
            className="w-10"
          />
          <span className="text-h-6 font-bold text-primary">Agriplan</span>
        </div>
      </Link>
      <div className="flex gap-[10px]">
        <Link to={APPLICATION_DOWNLOAD_LINK}>
          <Button
            variant={"outline-green"}
            size="sm"
            className={"rounded-full h-[37px] py-2 px-[10px] w-[105px]"}
            id="download-5"
          >
            Download
          </Button>
        </Link>
        <Link to="/login">
          <Button
            variant={"green"}
            size="sm"
            className={"rounded-full h-[37px] py-2 px-[10px]  w-[105px]"}
            id="login-button"
          >
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}
