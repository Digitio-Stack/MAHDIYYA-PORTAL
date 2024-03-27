import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const { referenceId } = useParams();

  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("referenceId", referenceId);
  formData.append("remarks", remarks);

  const fileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
      });
    } else {
      try {
        setLoading(true);
        let res = await Axios.post(`/uploads`, formData);
        if (res.status === 200) {
          setFile(null);
          setLoading(true);
          toast.success("file uploaded successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          window.location.href = "/my-uploads";
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        let response = await Axios.get(`/downloads/${referenceId}`);
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getdata();
  }, [referenceId]);
  return (
    <div className="flex flex-col mx-auto max-w-xl items-center mt-8">
      <h1 className="text-center font-bold text-2xl bg-gray-600 p-3 text-white mb-5">
        {data?.title}
      </h1>
      <div className="w-full">
        <label
          htmlFor="dropzone-file"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          File 
        </label>
        <input
          id="dropzone-file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="bg-gray-50 border border-gray-300 cursor-pointer w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2"
        />
      </div>
      <div className="w-full">
        {" "}
        <label
          htmlFor="Remarks"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Remarks
        </label>
        <input
          id="dropzone-file"
          type="text"
          onChange={(e) => setRemarks(e.target.value)}
          className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700"
        />
      </div>

      <button
        onClick={(e) => fileUpload(e)}
        className="mt-4 px-6 w-full py-3 bg-blue-900 text-white font-bold rounded-md hover:bg-blue-800"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default FileUpload;
