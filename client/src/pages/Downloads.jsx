import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";
import { UserAuthContext } from "../context/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Downloads() {
  const { authData } = useContext(UserAuthContext);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteFile = async (e, id) => {
    e.preventDefault();
    if (window.confirm("do you want to delete this file")) {
      try {
        let res = await Axios.delete(`/downloads/${id}`);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        toast.error("something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        console.log(error.response);
      }
    }
  };
  const handleFileChange = (file) => {
    setFile(file);
  };
  const getDownloads = async () => {
    try {
      let { data } = await Axios.get("/downloads");
      setDownloads(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("type", type);
  const fileUpload = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!title || !type || !file) {
        toast.error("Please fill all fields", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setLoading(false);
      }

      let res = await Axios.post("/downloads", formData);
      if (res.status === 200) {
        setFile(null);
        setLoading(true);
        toast.success("file uploaded successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      toast.error("Error occured", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getDownloads();
  }, [type]);
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Downloads</h1>
      {authData?.role === "superAdmin" && (
        <div className="max-w-xl mx-auto">
          <div className="w-full">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-blue-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              id="countries"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose one</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-3 ">
            <label
              htmlFor="formFile"
              className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
            >
              Put Your File Here
            </label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
              type="file"
              id="formFile"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>

          <div>
            <label
              htmlFor="formFile"
              className="mb-2 inline-block text-neutral-500 dark:text-neutral-400"
            >
              Title Here
            </label>
            <input
              type="text"
              id="file-title"
              className="relative m-0 block w-full min-w-0 flex-auto  rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
              placeholder="File Name Here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {
            <>
              {loading ? (
                <button className="bg-indigo-700 w-full text-white font-bold px-4 py-2 mb-3 hover:bg-indigo-400 mt-2">
                  Uploading...
                </button>
              ) : (
                <button
                  onClick={fileUpload}
                  className="bg-indigo-700 w-full text-white font-bold px-4 py-2 mb-3 hover:bg-indigo-400 mt-2"
                >
                  Upload
                </button>
              )}
            </>
          }
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {downloads.map((download, key) => (
          <div
            className="bg-gray-900 shadow-xl rounded-lg p-6 text-gray-800 "
            key={key}
          >
            <div className="flex  items-center justify-between">
              <p className={`w-fit mb-3 text-sm   uppercase`}>
                {download.type}
              </p>
              {authData?.role === "superAdmin" && (
                <button
                  onClick={(e) => deleteFile(e, download._id)}
                  className=" text-red-400 hover:text-red-600 hover:underline px-4 py-2 rounded-full transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>

            <a
              target="_blank"
              href={`${download.fileName}`}
              className="text-lg mb-4 text-gray-300 hover:text-gray-400"
            >
              {download.title}
            </a>

            <a
              target="_blank"
              className="bg-gray-700 px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-800"
              href={`${download.fileName}`}
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Downloads;
