import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetpasswordPage from "./ResetpasswordPage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otpsend, setOTPsend] = useState(false);

  function popupNotification(message, type) {
    return toast[type](message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }


  async function handleFormSubmit(e) {
    e.preventDefault();
  
    try {
      const response = await axios.post("/login", { email, password });
  
      if (response.status === 200) {
        const { avatar, name, email, location } = response.data.user;
  
        // Wrap storage operations in a Promise
        await new Promise((resolve, reject) => {
          try {
            sessionStorage.setItem("token", response.data.token);
            localStorage.setItem(
              "user",
              JSON.stringify({ avatar, name, email, location })
            );
            resolve(); // Resolve after successful storage
          } catch (error) {
            reject(error); // Reject if there's an error
          }
        });
  
        navigate("/home"); // Navigate after storage is complete
      }
    } catch (error) {
      console.error(error);
      popupNotification(error.response?.data || "Login failed", "error");
    }
  }
  
  
  
  
  

  async function handleResetPassword(e) {
    e.preventDefault();
    await axios
      .post("/forgotpassword", { email })
      .then((response) => {
        console.log("response from /forgotpassword", response.data);
        popupNotification(response.data.message, "info");
        if (response.status === 200) {
          setTimeout(() => {
            setOTPsend(true);
          }, 2500);
        }
      })
      .catch((error) => {
        console.log("Catch error from /forgotpassword ", error);
        popupNotification(error.response.data.message, "error");
      });
  }

  return (
    <>
      {!otpsend ? (
        <div className="min-h-screen w-screen bg-slate-900 text-white flex items-center justify-center px-4">
          {!forgotPassword ? (
            <form
              className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md"
              onSubmit={handleFormSubmit}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                Login Here
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  name="email"
                  placeholder="yourmail@gmail.com"
                  className="w-full px-4 py-2 rounded-lg bg-gray-500 bg-opacity-10 placeholder:italic placeholder:text-gray-600"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  name="password"
                  placeholder="*******"
                  className="w-full px-4 py-2 rounded-lg bg-gray-500 bg-opacity-10 placeholder:italic placeholder:text-gray-600"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-white"
              >
                Login
              </button>

              <Link
                to="/signup"
                className="text-sky-400 text-sm w-full text-center cursor-pointer"
              >
                <p className="mt-4">
                  Don`t have an account ?
                  <span className="underline">Create here</span>
                </p>
              </Link>
              <p className="text-sky-400 text-sm w-full text-center cursor-pointer">
                <p className="mt-2" onClick={() => setForgotPassword(true)}>
                  Forgot password? <span className="underline">Reset here</span>
                </p>
              </p>
            </form>
          ) : (
            <form
              className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md"
              onSubmit={handleResetPassword}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                Reset password
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="yourmail@gmail.com"
                  className="w-full px-4 py-2 rounded-lg bg-gray-500 bg-opacity-10 placeholder:italic placeholder:text-gray-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-white mt-4"
              >
                Reset Password
              </button>
              <Link
                to="/signup"
                className="text-sky-400 text-sm w-full text-center cursor-pointer"
              >
                <p className="mt-4">
                  Don`t have an account ?
                  <span className="underline">Create here</span>
                </p>
              </Link>
            </form>
          )}

          <ToastContainer />
        </div>
      ) : (
        <ResetpasswordPage email={email} />
      )}
    </>
  );
}
