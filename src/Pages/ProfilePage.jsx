import axios from "axios";
import { useState } from "react";
import UserPosts from "./UserPosts";
import { FaShare } from "react-icons/fa";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePic, setProfilePic] = useState(user.avatar);
  const [showpost, setShowpost] = useState(false);

  const token = sessionStorage.getItem("token");
  if (!token) return (
    <Navigate to="/login" />
  )

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

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    await axios
      .post("/setavatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const user = JSON.parse(localStorage.getItem("user")) || {};
          user.avatar = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          setProfilePic(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        sessionStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
        
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  function handleshareProfile(e) {
    e.preventDefault();
    let url = `https://blog-frontend-vijay.vercel.app/profile/${user.email}`
    navigator.clipboard
      .writeText(url)
      .then(() => {
        popupNotification("Link Copied", "success");
      })
      .catch((err) => {
        popupNotification(err, "error");
      });
  }

  return (
   <>
   {
    token &&(
      <div className=" min-h-screen w-full bg-slate-900 text-white flex justify-center p-6">
      {!showpost ? (
        <div className="p-4 rounded-xl bg-white bg-opacity-[0.05] backdrop-blur-[5px] border border-white border-opacity-[0.18] h-fit ">
          <div className=" flex justify-center w-full ">
            <img
              src={profilePic}
              alt="User Avatar"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <div className="text-center text-sky-400 font-semibold text-xl">
            {user.name}
          </div>
          <div className="mt-6 ">
            <label className="ml-1 text-sm text-gray-600">Set avatar</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 bg-opacity-10 cursor-pointer hover:text-sky-400"
            />
          </div>

          <div className="bg-gray-700 bg-opacity-10 my-3 px-4 py-3 rounded-lg flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>

            <span className="ml-2">{user.email}</span>
          </div>
          <div className="bg-gray-700 bg-opacity-10 my-3 px-4 py-3 rounded-lg flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="ml-2">{user.location}</span>
          </div>
          <div
            className="bg-gray-100 bg-opacity-10 my-3 px-4 py-3 rounded-lg flex cursor-pointer hover:text-sky-400"
            onClick={() => setShowpost(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
              <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
            </svg>

            <span className="ml-2">My blogs</span>
          </div>
          <div className="bg-gray-100 bg-opacity-10 my-3 px-4 py-3 rounded-lg flex cursor-pointer hover:text-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>

            <span className="ml-2">Loved Blogs</span>
          </div>
          <button
            onClick={handleshareProfile}
            className="bg-gray-100 bg-opacity-10 items-center my-3 px-4 py-3 rounded-lg flex hover:text-sky-400 cursor-pointer w-full"
          >
            <FaShare size={18} />
            <span className="ml-2"> Share Profile</span>
          </button>
          <button
            className="bg-red-400 bg-opacity-10 mt-12 px-4 py-3 rounded-lg flex text-red-600 w-full  justify-center"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="ml-2 ">Logout</span>
          </button>
        </div>
      ) : (
        <div className="w-full">
          <button
            onClick={() => setShowpost(false)}
            className="text-sky-400 flex items-center hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="ml-1">Back to Profile</span>
          </button>
          <UserPosts />
        </div>
      )}
      <ToastContainer />
    </div>
    )
   }
   </>
  );
}
