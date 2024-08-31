import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";

export default function PublicProfile() {
  const [data, setData] = useState(null);
  const { id } = useParams();
const [error, setError] = useState(null)
  useEffect(() => {
    axios
      .get(`/publicprofile/${id}`)
      .then((response) => {
        setData(response.data);
        if(response.status === 200) {
          console.log(response.data);
        }
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.response.data.message)
      });
  }, [id]);

  if (!data) return (
    <div>
      {error && (
        <div className="flex min-h-screen w-full bg-slate-900 text-gray-500 justify-center pt-28 gap-2">
         <FaUserXmark size={30}/>
        <span className="text-2xl"> {error}</span>
          </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col md:flex-row p-6">
      <div className="p-4 rounded-xl bg-white bg-opacity-[0.05] backdrop-blur-[5px] border border-white border-opacity-[0.18] h-fit mb-6">
        <div className="flex justify-center w-full">
          <img
            src={data.avatar}
            alt="User Avatar"
            className="h-20 w-20 rounded-full"
          />
        </div>
        <div className="text-center text-sky-400 font-semibold text-xl">
          {data.name}
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
          <span className="ml-2">{data.email}</span>
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
          <span className="ml-2">{data.location}</span>
        </div>
        <div className="bg-gray-700 bg-opacity-10 items-center my-3 px-4 py-3 rounded-lg flex hover:text-sky-400 cursor-pointer">
        <FaShare size={18}/>
          <span className="ml-2"> Profile</span>
        </div>
      </div>

      {data.posts.length > 0 && (
        <div className="flex flex-col md:flex-row h-fit md:w-3/4 justify-evenly flex-wrap gap-y-6">
          {data.posts.map((post) => (
            <Link
          to={`/read/${post._id}`}
              key={post._id}
              className=" cursor-pointer p-4 md:max-w-96 w-full rounded-xl bg-white bg-opacity-[0.05] backdrop-blur-[5px] border border-white border-opacity-[0.18]"
            >
              <h2 className="text-2xl font-semibold mb-2 text-sky-400">{post.title}</h2>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />

              <div className="text-gray-400 text-sm mt-2">
                Posted on: {new Date(post.date).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
