import gambar from "../../assets/504.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function Error504({ to }) {
  return (
    <>
      <div className="justify-center flex mb-[32px]">
        <img src={gambar} className=" w-[469px] h-[449px]" />
      </div>
      <div className="flex justify-center items-center mb-[100px]">
        <Link to={to} className="">
          <Button
            id="error-504"
            variant={"green"}
            size="lg"
            className="rounded-full"
          >
            Go Back
          </Button>
        </Link>
      </div>
    </>
  );
}
