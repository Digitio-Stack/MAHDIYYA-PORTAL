import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";

function MessageTable({ messages, getMessages }) {
  const [showMore, setShowMore] = useState(null);
  const handleExpandRow = (rowIndex) => {
    setShowMore(showMore === rowIndex ? null : rowIndex);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      if (window.confirm("are you sure")) {
        let res = await Axios.post(`/messages/delete?id=${id}`);
        toast.success("deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        getMessages();
      }
    } catch (error) {
      console.log(error.response);
      toast.error("error occured", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <table className="w-2xl mx-auto  text-center bg-white shadow-md rounded-lg">
      <thead className="bg-gray-300">
        <tr>
          <th className="px-4 py-2 text-sm font-normal">#</th>
          <th className="px-4 py-2 text-sm font-normal">Title</th>
          <th className="px-4 py-2 text-sm font-normal">Recipients</th>
          <th className="px-4 py-2 text-sm font-normal">Link</th>
          <th className="px-4 py-2 text-sm font-normal">Actions</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message, index) => (
          <tr key={message._id} className="">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{message.title}</td>
            <td className="px-4 py-2">
              <div className="grid grid-cols-3 gap-1">
                {message?.recipients?.map((item, idx) => (
                  <p key={idx} className="bg-gray-200 text-center m-1 p-2 rounded-lg">
                    {item.user.username}
                  </p>
                ))}
              </div>
            </td>
            <td className="px-4 py-2">
              <a
                href={message.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 px-3 py-1 uppercase bg-gray-600  underline"
              >
                View
              </a>
            </td>
            <td className="px-4 py-2">
              <button
                onClick={(e) => handleDelete(e, message._id)}
                className="text-red-500  bg-gray-300 px-3 py-1 uppercase"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MessageTable;
