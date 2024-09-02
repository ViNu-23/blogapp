import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReloadPage from "./ReloadPage";
import { format } from "date-fns";
import { TbWifiOff } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/posts/${currentPage}`);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  };

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
          <ReloadPage />
        ) : filteredPosts.length > 0 ? (
          <>
            {filteredPosts.map((post, i) => (
              <Link
                to={`/read/${post._id}`}
                key={i}
                className="w-full md:w-1/3 p-2 relative"
              >
                <div className="cursor-pointer hover:scale-[1.010] transition-transform duration-200 p-4 rounded-xl bg-white bg-opacity-[0.05] backdrop-blur-[5px] border border-white border-opacity-[0.18]">
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
                          src={
                            post.owner?.avatar || "path/to/default/avatar.jpg"
                          }
                          alt="img"
                        />
                      </div>
                      <div className="ml-2">
                        <div className="flex items-center">
                          <h1 className="text-base font-semibold">
                            {post.owner?.name || "Anonymous"}
                          </h1>
                          <span className="ml-1 text-sky-400">
                            {/* SVG Icon */}
                          </span>
                        </div>
                        <p className="text-sm font-light">
                          {formatDate(post.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center bg-slate-600 bg-opacity-10 px-3 py-2 text-sm leading-5 rounded-lg font-semibold text-sky-400">
                        #{post.category}
                      </button>

                      <div className="text-red-400 flex items-center justify-center gap-1">
                        <p className="text-lg">{post.lovedBy.length}</p>
                        <FaHeart size={17} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="flex gap-6 items-center my-4 w-full justify-center">
              {currentPage > 1 && (
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 w-28 py-1 bg-sky-400 rounded-lg"
                >
                  <GrFormPrevious size={20} /> Previous
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center  px-3 w-28 py-1 bg-sky-400 rounded-lg"
              >
                Next <GrFormNext size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-col justify-center  items-center">
            <h1 className="flex justify-center">
              <TbWifiOff size={30} />
            </h1>
            <p> Connection lost !</p>
          </div>
        )}
      </div>
    </div>
  );
}
