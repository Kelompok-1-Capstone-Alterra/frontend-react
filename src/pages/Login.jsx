import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import gambar from "../assets/Login.png";
import logo from "../assets/Logo.png";
import TextField from "../components/TextField";
import { Eye24Regular,EyeOff24Regular} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";



function Login() {
  const navigate = useNavigate();
  const [emailPasswordError, setEmailPasswordError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    if (email === "" || password === "") {
      setEmailPasswordError(false);
      setShowAlert(true);
    } else if (email !== "admin" || password !== "admin") {
      setEmailPasswordError(true);
      setShowAlert(false);
    } else {
      setEmailPasswordError(false);
      setShowAlert(false);
      navigate(`/admin`)
    }
  };
  const showEye = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Alert */}
      {showAlert && (
        <div className="alert-overlay fixed z-[5rem] w-[50rem] flex justify-center items-center pt-5 ml-[29rem]">
            <Alert variant="warning" message="Field Tidak Boleh Kosong"></Alert>
        </div>
      )}

      {/* email and password alert */}
      {emailPasswordError && (
        <div className="alert-overlay fixed z-[5rem] w-[50rem] flex justify-center items-center pt-5 ml-[29rem]">
        <Alert variant="warning" message="Email Atau Kata Sandi Salah"></Alert>
    </div>
      )}

      {/* component */}
      <div
        className="h-screen flex justify-center items-center w-full"
        style={{
          backgroundImage: `url('${gambar}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white px-10 py-8 rounded-xl w-screen max-w-sm">
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-bold text-[#10B981] flex justify-center items-center">
                <img src={logo} alt="Logo" className="mr-2 w-10" />
                Agriplan
              </h1>
              <div>
                <TextField
                  id="email-input"
                  label="Email"
                  className={`px-4 py-2 outline-none rounded-md w-full border ${
                    showAlert ? "border-red-500" : ""
                  } ${emailPasswordError ? "border-red-500" : ""}`}
                  type="text"
                  register={register("email")}
                  error={errors.email}
                />
              </div>
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <label
                  htmlFor="password"
                  className="block mb-1 text-body-sm font-semibold"
                >
                  Kata Sandi
                </label>
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  className={`px-4 py-2 outline-none rounded-md w-full border ${
                    showAlert ? "border-red-500" : ""
                  } ${emailPasswordError ? "border-red-500" : ""}`}
                  {...register("password")}
                />
                <button
                  id="eye-button"
                  className="absolute right-3 top-[3rem] transform -translate-y-1/2"
                  type="button"
                  onClick={showEye}
                >
                  {showPassword ? (
                    <Eye24Regular/>
                  ) : (
                    <EyeOff24Regular/>
                  )}
                </button>
              </div>
            </div>
            <Button
              id="submit-button"
              variant={"green"}
              className={"rounded-full mt-10 w-full"}
              onClick={() => {
                handleSubmit(onSubmit);
              }}
            >
              Masuk
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
