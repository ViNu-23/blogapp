import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function OtpValidation({ email }) {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/verifyotp", { otp, email })
      .then((response) => {
        if (response.status === 200) {
          const { avatar, name, email,location } = response.data;
          localStorage.setItem("user", JSON.stringify({ avatar, name, email,location }));
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-6 text-center">
          We`ve sent an OTP to your {email}. Please enter it below.
        </h2>

        <div className="mb-6">
          <input
            type="text"
            name="otp"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center text-black text-xl font-mono rounded-lg focus:outline-none p-2"
            placeholder="Enter 6-digit OTP"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-700 px-5 py-2 text-sm md:text-base leading-5 rounded-lg font-semibold text-white"
        >
          Validate OTP
        </button>
      </form>
    </div>
  );
}
