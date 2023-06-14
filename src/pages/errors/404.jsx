import gambar from "../../assets/405.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function Error404({ to }) {
  return (
    <>
      <div className="justify-center flex mb-[32px]">
        <img src={gambar} className="w-[469px] h-[449px]" alt="Error 400" />
      </div>
      {to && (
        <div className="flex justify-center items-center">
          <Link to={to}>
            <Button
              id="error-400"
              variant="green"
              size="lg"
              className="rounded-full"
            >
              Go Back
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
