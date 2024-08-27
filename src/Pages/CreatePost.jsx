import { useState } from "react"

export default function CreatePost() {
const [title, setTitle] = useState("")
const [category, setCategory] = useState("");
const [image, setImage] = useState("");
const [description, setDescription] = useState("")

const [sendImg, setSendImg] = useState("")

  return (
    <div className="min-h-screen  bg-slate-900 text-white flex  justify-center px-4 pt-10 pb-4">
      <form className="bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-3xl ">
      <h2 className="text-2xl font-semibold  text-center text-sky-400">Create new post</h2>
      <div className="w-full h-[1px] bg-gray-700 my-4 "/>


      

    

      


    </form>
  </div>
  )
}
