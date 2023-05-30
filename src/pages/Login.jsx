import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import gambar from "../assets/Login.png";
import logo from "../assets/Logo.png";
import TextField from "../components/TextField";
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";
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
      navigate(`/admin`);
    }
  };
  const showEye = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* component */}
      <div
        className="h-[calc(100vh-152px)] flex flex-col items-center w-full"
        style={{
          backgroundImage: `url('${gambar}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Alert
          className={`${
            showAlert || emailPasswordError ? "visible" : "invisible"
          } lg:w-[971px] mt-12 mb-8`}
          variant="error"
          message={
            showAlert
              ? "Field Tidak Boleh Kosong"
              : emailPasswordError
              ? "Email Atau Kata Sandi Salah"
              : ""
          }
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-md p-8">
            <div className="space-y-4">
              <h1 className="text-center text-h-4 font-bold text-[#10B981] flex justify-center items-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="mr-2 w-10"
                />
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
                  {showPassword ? <Eye24Regular /> : <EyeOff24Regular />}
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
