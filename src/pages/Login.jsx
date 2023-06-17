import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import gambar from "../assets/Login.webp";
import logo from "../assets/Logo.png";
import TextField from "../components/TextField";
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Cookies from "js-cookie";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { AnimatePresence } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, isLoading } = useAuth();

  useEffect(() => {
    let timer;
    if (alert.show) {
      timer = setTimeout(() => {
        setAlert({
          show: false,
          message: "",
        });
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [alert.show]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    if (email === "" || password === "") {
      setAlert({
        show: true,
        message: "Field Tidak Boleh Kosong",
      });
      return;
    }
    const res = await login(email, password);
    if (res.status === 200) {
      const user = {
        admin_id: res.data.data.admin.ID,
        admin_name: res.data.data.admin.admin_name,
        admin_email: res.data.data.admin.admin_email,
      };
      localStorage.setItem("user", JSON.stringify(user));
      Cookies.set("token", res.data.data.token);
      navigate("/admin");
    } else {
      if (res.status === 500 || res.status === 504) {
        setAlert({
          show: true,
          message: "Terjadi Kesalahan pada Server",
        });
      } else {
        setAlert({
          show: true,
          message: "Email atau Password Salah",
        });
      }
    }
  };

  const showEye = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <AnimatePresence>
          {alert.show && (
            <Alert
              className={`fixed w-4/6 mt-8`}
              variant="error"
              message={alert.message}
            />
          )}
        </AnimatePresence>
      </div>
      <div
        className="h-[calc(100vh-152px)] py-8 flex flex-col items-center justify-center w-full"
        style={{
          backgroundImage: `url('${gambar}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-md p-7">
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
                    alert.show ? "border-red-500" : "border-neutral-30"
                  } `}
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
                    alert.show ? "border-red-500" : "border-neutral-30"
                  }`}
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
              disabled={isLoading}
              className={"rounded-full mt-10 w-full"}
              type="submit"
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
