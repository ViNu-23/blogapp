import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post("/login", { email, password })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const { avatar, name, email,location } = response.data;
          localStorage.setItem("user", JSON.stringify({ avatar, name, email,location }));
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="min-h-screen w-screen bg-slate-900 text-white flex items-center justify-center px-4">
      <form className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Here</h2>

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
            className="w-full px-4 py-2 rounded-lg bg-gray-100 bg-opacity-10"
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
            className="w-full px-4 py-2 rounded-lg bg-gray-100 bg-opacity-10"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleFormSubmit}
          className="w-full bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-white"
        >
          Login
        </button>

        <Link to="/signup" className="text-sky-400 text-sm w-full text-center">
          <p className="mt-4">
            {" "}
            Don`t have an account ?{" "}
            <span className="underline">Create here</span>
          </p>
        </Link>
        <Link to="/signup" className="text-sky-400 text-sm w-full text-center">
          <p className="mt-2">
            {" "}
            Forgot password ? <span className="underline">Reset here</span>
          </p>
        </Link>
      </form>
    </div>
  );
}
