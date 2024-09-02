import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationPage from "./NotificationPage";
import { useState } from "react";

export default function NavbarPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const searchBar = location.pathname === "/" || location.pathname === "/";
  const newPost = location.pathname === "/create";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const token = sessionStorage.getItem("token");

  function handleCreatePost() {
    if (user) {
      navigate("/create");
    } else {
      console.log("login first");
      toast.info("Please Login before creating a post", {
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
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  }

  return (
    <div className="bg-slate-900 px-6 py-4 border-b-[1px] border-slate-700">
      <ul className="text-white flex justify-between items-center w-full">
        <Link to="/" className="flex items-center md:w-2/6 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:text-sky-400"

          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>
          <span>
            {!isMobile && (
              <span className="ml-2 text-xl font-semibold">Blog Today</span>
            )}
          </span>
        </Link>
        {searchBar && (
          <>
            {!isMobile && (
              <li className="w-96 flex items-center relative">
                <input
                  type="text"
                  className=" bg-slate-800 rounded-full px-5 py-2 w-full text-white "
                  placeholder="Search..."
                  value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span onClick={handleSearchSubmit} className="absolute text-sky-400 right-4 cursor-pointer hover:scale-125 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
              </li>
            )}
          </>
        )}

        {!newPost && (
          <li>
            <button
              className="flex items-center hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
              onClick={handleCreatePost}
            >
              Create Blog
              <span className="ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </li>
        )}
        {token ? (
          <>
            <div className="relative cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sky-400 text-sm font-bold absolute -top-2 -right-1">
                <NotificationPage />
              </div>
            </div>

            <Link
              to="/profile"
              className="text-white font-semibold h-7 w-8 rounded-full cursor-pointer flex items-center "
            >
              <img
                src={user.avatar}
                alt="img"
                className="object-contain rounded-full"
              />
            </Link>
          </>
        ) : (
          <li>
            <Link
              to="/signup"
              className="bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300 active:bg-teal-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
            >
              Create&nbsp;account
            </Link>
          </li>
        )}
      </ul>
      {searchBar && (
        <>
          {isMobile && (
            <div className="flex justify-center mt-3">
              <li className="w-96 flex items-center relative">
                <input
                  placeholder="Search..."
                  type="text"
                  className=" bg-slate-800 rounded-full px-5 py-2 w-full text-white"
                  value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute text-sky-400 right-4 cursor-pointer hover:scale-125 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                    onClick={handleSearchSubmit}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
              </li>
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
}
