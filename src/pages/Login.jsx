import React, { useState } from "react";
import Button from "../components/Button";
import gambar from "../assets/Login.png";
import logo from "../assets/Logo.png";
import TextField from "../components/TextField";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPasswordError, setEmailPasswordError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleonclick = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setEmailPasswordError(false);
      setShowAlert(true);
    } else if (email !== "admin" || password !== "admin") {
      setEmailPasswordError(true);
    }else{
      setEmailPasswordError(false)
      setShowAlert(false)
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
      {emailPasswordError && (
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
            <p class="font-bold pl-1 ">Email atau Kata sandi salah</p>
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
                <TextField
                  label="Email"
                  className={`px-4 py-2 outline-none rounded-md w-full border ${
                    emailPasswordError ? "border-red-500" : ""
                  }  ${
                    showAlert ? "border-red-500" : ""
                  }`}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                ></TextField>
              </div>
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Kata Sandi
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`px-4 py-2 outline-none rounded-md w-full border ${
                    emailPasswordError ? "border-red-500" : ""
                  }  ${
                    showAlert ? "border-red-500" : ""
                  }`}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                  <button className="absolute right-3 top-[3rem] transform -translate-y-1/2"
                  type="button"
                  onClick={showEye}
                >
                  {showPassword ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9999 9.00462C14.209 9.00462 15.9999 10.7955 15.9999 13.0046C15.9999 15.2138 14.209 17.0046 11.9999 17.0046C9.79073 17.0046 7.99987 15.2138 7.99987 13.0046C7.99987 10.7955 9.79073 9.00462 11.9999 9.00462ZM11.9999 10.5046C10.6192 10.5046 9.49987 11.6239 9.49987 13.0046C9.49987 14.3853 10.6192 15.5046 11.9999 15.5046C13.3806 15.5046 14.4999 14.3853 14.4999 13.0046C14.4999 11.6239 13.3806 10.5046 11.9999 10.5046ZM11.9999 5.5C16.6134 5.5 20.596 8.65001 21.701 13.0644C21.8016 13.4662 21.5574 13.8735 21.1556 13.9741C20.7537 14.0746 20.3465 13.8305 20.2459 13.4286C19.307 9.67796 15.9212 7 11.9999 7C8.07681 7 4.68997 9.68026 3.75273 13.4332C3.65237 13.835 3.24523 14.0794 2.84336 13.9791C2.44149 13.8787 2.19707 13.4716 2.29743 13.0697C3.40052 8.65272 7.38436 5.5 11.9999 5.5Z"
                      fill="#212121"
                    />
                  </svg>
                  ):<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.21967 2.21967C1.9534 2.48594 1.9292 2.9026 2.14705 3.19621L2.21967 3.28033L6.25424 7.3149C4.33225 8.66437 2.89577 10.6799 2.29888 13.0644C2.1983 13.4662 2.4425 13.8735 2.84431 13.9741C3.24613 14.0746 3.6534 13.8305 3.75399 13.4286C4.28346 11.3135 5.59112 9.53947 7.33416 8.39452L9.14379 10.2043C8.43628 10.9258 8 11.9143 8 13.0046C8 15.2138 9.79086 17.0046 12 17.0046C13.0904 17.0046 14.0788 16.5683 14.8004 15.8608L20.7197 21.7803C21.0126 22.0732 21.4874 22.0732 21.7803 21.7803C22.0466 21.5141 22.0708 21.0974 21.8529 20.8038L21.7803 20.7197L15.6668 14.6055L15.668 14.604L14.4679 13.4061L11.598 10.5368L11.6 10.536L8.71877 7.65782L8.72 7.656L7.58672 6.52549L3.28033 2.21967C2.98744 1.92678 2.51256 1.92678 2.21967 2.21967ZM10.2041 11.2655L13.7392 14.8006C13.2892 15.2364 12.6759 15.5046 12 15.5046C10.6193 15.5046 9.5 14.3853 9.5 13.0046C9.5 12.3287 9.76824 11.7154 10.2041 11.2655ZM12 5.5C10.9997 5.5 10.0291 5.64807 9.11109 5.925L10.3481 7.16119C10.8839 7.05532 11.4364 7 12 7C15.9231 7 19.3099 9.68026 20.2471 13.4332C20.3475 13.835 20.7546 14.0794 21.1565 13.9791C21.5584 13.8787 21.8028 13.4716 21.7024 13.0697C20.5994 8.65272 16.6155 5.5 12 5.5ZM12.1947 9.00928L15.996 12.81C15.8942 10.7531 14.2472 9.10764 12.1947 9.00928Z" fill="#212121"/>
                  </svg>}
                </button>
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
