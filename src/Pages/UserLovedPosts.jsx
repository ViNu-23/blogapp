/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { IoHeartDislikeCircleSharp } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function UserLovedPosts() {
  const [posts, setPosts] = useState([]);

  const token = sessionStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

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

  useEffect(() => {
    axios
      .get("/userlikedposts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data.posts);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  async function handleDisLikeButton(e,id) {
    e.preventDefault();
    await axios
      .post("/dislike", { postId: id })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          popupNotification("Post removed from Like list", "warn");
          console.log("response from /dislike",response);
          setPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
        }
      })
      .catch((error) => {
        console.log("error from /dislike", error);
      });
  }

  function handleShare(id) {
    let url = `https://blog-frontend-vijay.vercel.app/read/${id}`;
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
      <div className="min-h-screen flex flex-col items-center px-5 bg-slate-900 text-white relative">
        {posts.length === 0 ? (
          <p className="mt-10 text-gray-700">No liked posts found</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="p-4 w-full lg:w-1/2 my-4 rounded-xl bg-white bg-opacity-[0.05] backdrop-blur-[5px] border border-white border-opacity-[0.18] flex flex-col sm:flex-row"
            >
              <div className="h-36 md:w-64 w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <div className="ml-0 md:ml-4 flex flex-col justify-between w-full gap-y-3">
                <h1 className="font-semibold text-xl text-sky-400 mt-2 md:mt-0">
                  {post.title}
                </h1>

                <Link to={`https://blog-frontend-vijay.vercel.app/profile/${post.owner.email}`} className="flex gap-x-4">
                  <p className="flex items-center gap-2 underline cursor-pointer">
                   {post.owner.name}
                    <FaExternalLinkAlt size={16}/>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    #{post.category}
                  </p>
                </Link>

                <div className="flex justify-between">
                  <Link
                    to={`https://blog-frontend-vijay.vercel.app/read/${post._id}`}
                    className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-lg hover:text-blue-400"
                  >
                    <span>Visit</span>
                    <FaEye size={20} />
                  </Link>

                  <button
                    className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-lg hover:text-red-400"
                    onClick={(e) => handleDisLikeButton(e, post._id)}
                  >
                    <span>Remove</span>
                    <IoHeartDislikeCircleSharp size={22} />
                  </button>

                  <button
                    className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-lg hover:text-teal-400"
                    // Implement handleShare function if needed
                    onClick={() => handleShare(post._id)}
                  >
                    <span>Share</span>
                    <FaShare size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer/>
    </>
  );
}
