import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import NavbarPage from "./Pages/NavbarPage";
import CreatePost from "./Pages/CreatePost";
import ReadPost from "./Pages/ReadPost";
import NotFoundPage from "./Pages/NotFoundPage";
import axios from "axios";

axios.defaults.baseURL = "https://blog-app-backend-green.vercel.app/";
// axios.defaults.baseURL = "http://localhost:3000"; 
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <>
      {!hideNavbar && <NavbarPage />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/read/:id" element={<ReadPost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
