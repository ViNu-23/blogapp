import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaClockRotateLeft, FaShare } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);


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
      .get("/userpost")
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const daysDifference = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      return "Today";
    } else if (daysDifference === 1) {
      return "1 day ago";
    } else if (daysDifference === 2) {
      return "2 days ago";
    } else {
      return format(date, "dd/MM/yyyy");
    }
  };

  function handleShare(id) {
    let url = `https://blog-frontend-vijay.vercel.app/read/${id}`
    navigator.clipboard.writeText(url)
    .then(() => {
      popupNotification("Link Copied", "success");
    })
    .catch(err => {
      popupNotification(err, "error");
    });
  }

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center bg-slate-900 text-white">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={index}
            className="p-4 w-full lg:w-1/2 my-4 rounded-xl bg-white bg-opacity-[0.05] backdrop-blur-[5px] border border-white border-opacity-[0.18] flex flex-col sm:flex-row"
          >
            <div className="h-36 md:w-64 w-ful ">
              <img
                src={post.image}
                alt="post"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="md:ml-4 flex flex-col justify-between w-full gap-y-3">
              <h1 className="font-semibold text-xl text-sky-400 mt-2 md:mt-0">
                {post.title}
              </h1>

              <div className="flex gap-x-4">
                <p className="flex items-center gap-2">
                  <FaClockRotateLeft />
                  {formatDate(post.date)}
                </p>
                <p className="flex items-center gap-2">
                  <BiSolidCategory />
                  {post.category}
                </p>
              </div>

              <div className="flex justify-between">
                <button className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-lg hover:text-blue-400">
                  <span>Edit</span>
                  <FaEdit />
                </button>

                <button className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-lg hover:text-red-400">
                  <span>Delete</span>
                  <MdDelete />
                </button>

                <button
                  className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-lg hover:text-teal-400"
                  onClick={()=>handleShare(post._id)}
                >
                  <span>Share</span>
                  <FaShare />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex text-gray-600 -mt-56">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="m20.798 11.012-3.188 3.416L9.462 6.28l4.24-4.542a.75.75 0 0 1 1.272.71L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262ZM3.202 12.988 6.39 9.572l8.148 8.148-4.24 4.542a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262ZM3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18Z" />
          </svg>
          <h1 className="ml-2">No posts available</h1>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
}
