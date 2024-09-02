import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import LovedBy from "./LovedBy";

export default function ReadPost() {
  const { id } = useParams();
  const [post, setPost] = useState();
  

  useEffect(() => {
    axios.get(`/readpost/${id}`).then((response) => {
      setPost(response.data);
      window.scrollTo({ top: 0 }); 

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

  return (
    <div className=" min-h-screen bg-slate-900 text-white px-6 py-4">
      {post && (
        <div>
          <div className="flex justify-center mt-4 relative">
            <img
              src={post.image}
              alt="img"
              className="md:w-1/2 w-full rounded-lg"
            />
            <div className="absolute top-4 lg:right-80 right-4">
            
              <LovedBy id={id} lovedBy={post.lovedBy}/> 
            </div>
          </div>
          <div className="my-4 text-center">
            <h1 className="font-semibold text-2xl text-sky-400">
              {post.title}
            </h1>
          </div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
          </div>
          <div className="my-6 flex justify-between">
            <div className="flex gap-4 items-center">
              <div className="h-16 w-16 overflow-hidden">
                <img
                  src={post.owner.avatar}
                  alt="img"
                  className="rounded-xl object-cover"
                />
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{post.owner.name}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                  <p>{post.owner.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around bg-slate-600 bg-opacity-10 px-5 py-3 text-sm leading-5 rounded-lg font-semibold text-sky-400">
            <div>#{post.category}</div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clipRule="evenodd"
                />
              </svg>
              {formatDate(post.date)}
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z"
                  clipRule="evenodd"
                />
              </svg>
              {post.owner.location}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
