import axios from "axios";
import { useState } from "react";
import OtpValidation from "./OtpValidation";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const countryOptions = [
  { value: "AF", label: "Afghanistan" },
  { value: "AM", label: "Armenia" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "BH", label: "Bahrain" },
  { value: "BD", label: "Bangladesh" },
  { value: "BT", label: "Bhutan" },
  { value: "BN", label: "Brunei" },
  { value: "KH", label: "Cambodia" },
  { value: "CN", label: "China" },
  { value: "CY", label: "Cyprus" },
  { value: "GE", label: "Georgia" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Iraq" },
  { value: "IL", label: "Israel" },
  { value: "JP", label: "Japan" },
  { value: "JO", label: "Jordan" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "KW", label: "Kuwait" },
  { value: "KG", label: "Kyrgyzstan" },
  { value: "LA", label: "Laos" },
  { value: "LB", label: "Lebanon" },
  { value: "MY", label: "Malaysia" },
  { value: "MV", label: "Maldives" },
  { value: "MN", label: "Mongolia" },
  { value: "MM", label: "Myanmar" },
  { value: "NP", label: "Nepal" },
  { value: "OM", label: "Oman" },
  { value: "PK", label: "Pakistan" },
  { value: "PH", label: "Philippines" },
  { value: "QA", label: "Qatar" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "SG", label: "Singapore" },
  { value: "KR", label: "South Korea" },
  { value: "LK", label: "Sri Lanka" },
  { value: "SY", label: "Syria" },
  { value: "TW", label: "Taiwan" },
  { value: "TJ", label: "Tajikistan" },
  { value: "TH", label: "Thailand" },
  { value: "TL", label: "Timor-Leste" },
  { value: "TR", label: "Turkey" },
  { value: "TM", label: "Turkmenistan" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "VN", label: "Vietnam" },
  { value: "YE", label: "Yemen" },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState();

  const [isotpsent, setIsotpsent] = useState(false);

  function popupNotification(message,type) {
    return toast[type](message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (name === "" || email === "" || location === "" || password === "") {
      return popupNotification("Please fill all form fields","info");
    }
    if (password.length < 8) {
      return popupNotification("Password must 8 character length","info");
    }

    axios
      .post("/signup", {
        name,
        email,
        location,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          setIsotpsent(true);
        }
      })
      .catch((error) => {
        console.error("Signup error:", error.response.data.message);
        popupNotification(error.response.data.message,"warning");
      });
  }

  return (
    <div className="min-h-screen w-screen bg-slate-900 text-white flex items-center justify-center px-4">
      {!isotpsent ? (
        <form className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              name="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-gray-500 bg-opacity-10 placeholder:italic placeholder:text-gray-600"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Location
            </label>
            <select
              name="Country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-500 bg-opacity-10 "
              required
            >
              <option value="" className="text-gray-600 italic">
                Select your country
              </option>
              {countryOptions.map((country) => (
                <option
                  className="bg-gray-800"
                  key={country.value}
                  value={country.label}
                >
                  {country.label}
                </option>
              ))}
            </select>
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
            onClick={handleFormSubmit}
            className="w-full bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-white"
          >
            Create Account
          </button>

          <Link to="/login" className="text-sky-400 text-sm w-full text-center">
            <p className="mt-4">
              {" "}
              Already have an account ?{" "}
              <span className="underline">login here</span>
            </p>
          </Link>
        </form>
      ) : (
        <OtpValidation email={email} />
      )}
      <ToastContainer />
    </div>
  );
}
