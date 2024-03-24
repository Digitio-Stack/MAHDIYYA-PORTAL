import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";

function ExamTable({ data, getExams }) {
  const [hallTickets, setHallTickets] = useState([]);

  const deleteItem = async (itemId) => {
    try {
      if (window.confirm("do you want to delete this item")) {
        let res = await Axios.delete(`/exam/${itemId}`);
        if (res.status === 200) {
          getExams();
          toast.success("Deleted successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Error Occured", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  const deleteHallTicket = async (itemId) => {
    try {
      if (window.confirm("do you want to delete this item")) {
        let res = await Axios.delete(`/hall-ticket/${itemId}`);
        if (res.status === 200) {
          getExams();
          toast.success("Deleted successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Error Occured", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  const getHallTickets = async () => {
    try {
      let { data } = await Axios.get("/hall-ticket");
      setHallTickets(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHallTickets();
  }, []);
  return (
    <div className="mt-4">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Exam name
            </th>

            <th scope="col" className="py-3 px-6">
              Class
            </th>

            <th scope="col" className="py-3 px-6">
              Subjects
            </th>
            <th scope="col" className="py-3 px-6">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="p-4">
          {hallTickets.map((hallTicket) => (
            <tr className="bg-white dark:bg-gray-800 border border-gray-200 my-3">
              <td
                scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap dark:text-white"
              >
                {hallTicket?.exam?.examName}
              </td>
              <td className="py-4 px-6">{hallTicket?.class?.className}</td>

              {hallTicket?.subjects.map((subject, key) => (
                <tr>
                  <td className="py-4 px-6 w-auto ">
                    <p className="text-gray-900">
                      {subject?.subjectId?.subjectName} -
                      {subject?.subjectId?.subjectCode}
                      <span className="text-sm text-gray-500 ml-4">
                        ({subject?.date}) ({subject?.time})
                      </span>
                    </p>
                  </td>
                </tr>
              ))}
              <td
                className="py-4 px-6 text-red-600 cursor-pointer"
                onClick={() => deleteHallTicket(hallTicket._id)}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="font-bold mt-5 text-center text-indigo-600">
        Exam Time Tables
      </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Exam name
            </th>

            <th scope="col" className="py-3 px-6">
              Academic Year
            </th>
            <th scope="col" className="py-3 px-6">
              Edit
            </th>
            <th scope="col" className="py-3 px-6">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-blue-900 whitespace-nowrap dark:text-white"
              >
                {item?.examName}
              </th>
              <td className="py-4 px-6">{item.academicYear}</td>
              <td class="py-4 px-6">
                <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </button>
              </td>
              <td class="py-4 px-6">
                <button
                  onClick={(e) => {
                    deleteItem(item._id);
                  }}
                  class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamTable;
