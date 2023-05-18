import React, { useState } from "react";
import Button from "../components/Button";
import gambar from "../assets/Login.png";
import logo from "../assets/Logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleonclick = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setShowAlert(true);
    } else if (email !== "admin") {
      setEmailError(true);
      setPasswordError(false);
      setShowAlert(false);
    } else if (password !== "admin") {
      setEmailError(false);
      setPasswordError(true);
      setShowAlert(false);
    } else {
      setEmailError(false);
      setPasswordError(false);
      setShowAlert(false);
    }
  };

  return (
    <>
      {/* Alert */}
      {showAlert && (
        <div className="alert-overlay fixed z-[5rem] w-[50rem] flex justify-center items-center pt-5 ml-[29rem]">
          <div
            class="bg-white border-l-4 border-red-500 text-orange-700 pt-4 pb-4 pl-2 pr-[30rem] flex"
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
    
    
            <p class="font-bold pl-1 ">Field tidak boleh kosong</p>
          </div>
        </div>
      )}
      {/* email alert */}
      {emailError && (
        <div className="alert-overlay fixed z-[5rem] w-[50rem] flex justify-center items-center pt-5 ml-[29rem]">
          <div
            class="bg-white border-l-4 border-red-500 text-orange-700 pt-4 pb-4 pl-2 pr-[30rem] flex"
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            <p class="font-bold pl-1 ">Email atau Kata sandi salah</p>
          </div>
        </div>
      )}
      {/* password alert */}
      {passwordError && (
        <div className="alert-overlay fixed z-[5rem] w-[50rem] flex justify-center items-center pt-5 ml-[29rem]">
          <div
            class="bg-white border-l-4 border-red-500 text-orange-700 pt-4 pb-4 pl-2 pr-[30rem] flex"
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            <p class="font-bold pl-1 ">Email atau Kata sandi salah </p>
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
        <form>
          <div className="bg-white px-10 py-8 rounded-xl w-screen max-w-sm">
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-bold text-[#10B981] flex justify-center items-center">
                <img src={logo} alt="Logo" className="mr-2 w-10" />
                Agriplan
              </h1>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  className={`px-4 py-2 outline-none rounded-md w-full border ${
                    emailError ? "border-red-500" : ""
                  }`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Kata Sandi
                </label>
                <input
                  type="password"
                  className={`px-4 py-2 outline-none rounded-md w-full border ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <Button
              variant={"green"}
              className={"rounded-full mt-10 w-full"}
              onClick={handleonclick}
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
