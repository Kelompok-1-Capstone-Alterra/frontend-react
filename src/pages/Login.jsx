import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import gambar from "../assets/Login.png";
import logo from "../assets/Logo.png";
import TextField from "../components/TextField";
import { Eye24Regular,EyeOff24Regular} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";


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
          <div
            className="bg-white border-l-4 border-red-500 text-orange-700 pt-4 pb-4 pl-2 pr-[30rem] flex"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
              />
                        
            </svg>

            <p className="font-bold pl-1 ">Field tidak boleh kosong</p>
          </div>
        </div>
      )}

      {/* email alert */}
      {emailPasswordError && (
        <div className="alert-overlay fixed z-[5rem] w-[50rem] flex justify-center items-center pt-5 ml-[29rem]">
          <div
            className="bg-white border-l-4 border-red-500 text-orange-700 pt-4 pb-4 pl-2 pr-[30rem] flex"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
              />
                        
            </svg>
            <p className="font-bold pl-1 ">Email atau Kata sandi salah</p>
          </div>
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
