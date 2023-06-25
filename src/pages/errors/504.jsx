import gambar from "../../assets/img/errors/504.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function Error504({ to }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img
          src={gambar}
          className="h-[449px]"
          alt="Error 504"
        />
        {to && (
          <div className="mt-4">
            <Link to={to}>
              <Button
                id="error-504"
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
