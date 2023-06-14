import gambar from "../../assets/401.png";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

export default function Error401({ to }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center justify-center">
      <img src={gambar} className="w-[469px] h-[449px]" alt="Error 401" />
      {to && (
        <div className="mt-4">
          <Link to={to}>
            <Button
              id="error-401"
              variant="green"
              size="lg"
              className="rounded-full"
            >
              Go Back
            </Button>
          </Link>
        </div>
      )}
    </div>
  </div>
  );
}
