import gambar from "../../assets/404.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function Error404({ to }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img src={gambar} className="w-[469px] h-[449px]" alt="Error 404" />
        {to && (
          <div className="mt-4">
            <Link to={to}>
              <Button
                id="error-404"
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
