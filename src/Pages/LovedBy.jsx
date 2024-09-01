/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LovedBy({ id, lovedBy }) {
  const [like, setLike] = useState(false);
  const [isLogedin, setIsLoggedin] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { email } = JSON.parse(storedUser);
      setIsLoggedin(true)
      if (lovedBy && email) {
        const isUserLoved = lovedBy.includes(email);
        setLike(isUserLoved);
      }
    }
  }, [lovedBy]);

  function popupNotification(message, type) {
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

  async function handleLikeButton(e) {
    e.preventDefault();
    const token = sessionStorage.getItem("token"); 
  
    if (isLogedin && token) {
      await axios
        .post(
          "/like",
          { postId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        )
        .then((response) => {
          console.log("response by /like",response);
  
          if (response.status === 200) {
            setLike((previous) => !previous);
            popupNotification("Post Liked", "info");
          }
        })
        .catch((error) => {
          console.log("error from /like", error);
        });
    } else {
      popupNotification("Please Login to Like a Post", "info");
    }
  }
  

  async function handleDisLikeButton(e) {
    e.preventDefault();
    await axios
      .post("/dislike", { postId: id })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          setLike((previous) => !previous);
          popupNotification("Post Disliked", "warn");
          console.log("response from /dislike",response);
        }
      })
      .catch((error) => {
        console.log("error from /dislike", error);
      });
  }

  return (
    <div className="text-red-400 cursor-pointer">
      {!like ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
          onClick={handleLikeButton}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-10"
          onClick={handleDisLikeButton}
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      )}
      <ToastContainer />
    </div>
  );
}
