import gambar from "../../assets/img/errors/403.png";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

export default function Error403({ to }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img
          src={gambar}
          className="h-[449px]"
          alt="Error 403"
        />
        {to && (
          <div className="mt-4">
            <Link to={to}>
              <Button
                id="error-403"
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
