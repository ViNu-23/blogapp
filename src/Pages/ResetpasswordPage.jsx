import axios from "axios";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ResetpasswordPage({ email }) {
  const [otp, setOTP] = useState();
  const [newpassword, setNewpassword] = useState("");
  const [verifiedotp, setVerifiedotp] = useState(false);

  const navigate = useNavigate();

  function popupNotification(message, type) {
    return toast[type](message, {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  async function handleValidateOtp(e) {
    e.preventDefault();
    await axios
      .post("/verifyotp", { email, otp })
      .then((response) => {
        console.log("response from /verifyotp", response.data);
        if (response.status === 200) {
          setVerifiedotp(true);
          const { avatar, name, email, location } = response.data.user;
          localStorage.setItem(
            "user",
            JSON.stringify({ avatar, name, email, location })
          );
        }
      })
      .catch((error) => {
        console.log("error from /verifyotp", error);
        popupNotification(error.response.data, "warn");
      });
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    await axios
      .post("/setnewpassword", { newpassword })
      .then((response) => {
        console.log("response from /setnewpassword", response.data);
        popupNotification(response.data.message, "success");
        if (response.status === 200) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log("error from /setnewpassword", error);
      });
  }

  return (
    <div className="min-h-screen w-screen bg-slate-900 text-white flex items-center justify-center px-4">
      {!verifiedotp ? (
        <>
          {email && (
            <form
              className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md"
              onSubmit={handleValidateOtp}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                We`ve sent an OTP to your {email}. Please enter it below.
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  name="otp"
                  placeholder=""
                  className="w-full px-4 py-2 rounded-lg bg-gray-500 bg-opacity-10 placeholder:italic placeholder:text-gray-600 font-mono"
                  required
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-white"
              >
                Validate OTP
              </button>
            </form>
          )}
        </>
      ) : (
        <div className="min-h-screen w-screen bg-slate-900 text-white flex items-center justify-center px-4">
          <form
            className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md"
            onSubmit={handleResetPassword}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Set New Password
            </h2>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Reset password
              </label>
              <input
                type="text"
                value={newpassword}
                name="name"
                placeholder=""
                className="w-full px-4 py-2 rounded-lg bg-gray-500 bg-opacity-10 placeholder:italic placeholder:text-gray-600"
                required
                onChange={(e) => setNewpassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-white"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
