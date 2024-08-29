import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReloadPage from "./ReloadPage";
import { format } from "date-fns";
import { TbWifiOff } from "react-icons/tb";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
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
    <div className="w-full min-h-screen px-4 py-8 bg-slate-900 text-white">
      <div className="flex flex-wrap justify-around">
        {loading ? (
          <ReloadPage/>
        ) : posts.length > 0 ? (
          posts.map((post, i) => (
            <Link
              to={`/read/${post._id}`}
              key={i}
              className="w-full md:w-1/3 p-2 relative"
            >
              <div className="cursor-pointer hover:scale-[1.010] transition-transform duration-200 p-4 rounded-xl bg-white bg-opacity-[0.05]   backdrop-blur-[5px] border border-white border-opacity-[0.18]">
                <div className="h-48">
                  <img
                    className="rounded-xl object-cover h-full w-full"
                    src={post.image}
                    alt="img"
                  />
                </div>
                <h1 className="truncate font-semibold my-2 text-lg text-sky-400">
                  {post.title}
                </h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg">
                      <img
                        className="rounded-lg object-cover h-full w-full"
                        src={post.owner.avatar}
                        alt="img"
                      />
                    </div>
                    <div className="ml-2">
                      <div className="flex items-center">
                        <h1 className="text-base font-semibold">{post.owner.name}</h1>
                        <span className="ml-1 text-sky-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M15 8c0 .982-.472 1.854-1.202 2.402a2.995 2.995 0 0 1-.848 2.547 2.995 2.995 0 0 1-2.548.849A2.996 2.996 0 0 1 8 15a2.996 2.996 0 0 1-2.402-1.202 2.995 2.995 0 0 1-2.547-.848 2.995 2.995 0 0 1-.849-2.548A2.996 2.996 0 0 1 1 8c0-.982.472-1.854 1.202-2.402a2.995 2.995 0 0 1 .848-2.547 2.995 2.995 0 0 1 2.548-.849A2.995 2.995 0 0 1 8 1c.982 0 1.854.472 2.402 1.202a2.995 2.995 0 0 1 2.547.848c.695.695.978 1.645.849 2.548A2.996 2.996 0 0 1 15 8Zm-3.291-2.843a.75.75 0 0 1 .135 1.052l-4.25 5.5a.75.75 0 0 1-1.151.043l-2.25-2.5a.75.75 0 1 1 1.114-1.004l1.65 1.832 3.7-4.789a.75.75 0 0 1 1.052-.134Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm font-light">{formatDate(post.date)}</p>
                    </div>
                  </div>
                  <div>
                    <button className="flex items-center bg-slate-600 bg-opacity-10 px-5 py-2 text-sm leading-5 rounded-lg font-semibold text-sky-400">
                      #{post.category}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex-col justify-center  items-center">
            <h1 className="flex justify-center"><TbWifiOff size={30}/></h1>
            <p>Lost connection !</p>
            </div>
        )}
      </div>
    </div>
  );
}
