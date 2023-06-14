import gambar from "../../assets/500.png";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

export default function Error500() {
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
