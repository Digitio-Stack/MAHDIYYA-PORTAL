import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import moment from "moment";
import { toast } from "react-toastify";

function Admissions() {
  const [students, setStudents] = useState([]);

  const getAdmissions = async () => {
    try {
      let studentsData = await Axios.get("/student/my-students/data");
      let { data } = await Axios.get("/student/my-admissions/data");
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };
  const approveAdmission = async (studentId) => {
    try {
      // Fetch student data

      // Update the student's data with the new registerNo
      await Axios.patch("/student/" + studentId, {
        verified: true,
      });

      getAdmissions();
      toast.success("Admission Approved", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmissions();
  }, []);
  return (
    <>
      <h1 className="text-white bg-blue-900 py-5 font-bold text-3xl text-center">
        Admission Requests
      </h1>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Class
              </th>
              <th scope="col" className="px-6 py-3">
                Requested Date
              </th>
              <th scope="col" className="px-6 py-3">
                Approve
              </th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 &&
              students.map((student, key) => (
                <tr
                  key={key}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-900 whitespace-nowrap dark:text-white"
                  >
                    {key + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-900 whitespace-nowrap dark:text-white"
                  >
                    {student.studentName}
                  </th>
                  <td className="px-6 py-4">{student.class.className}</td>
                  <td className="px-6 py-4">
                    {moment(student.createdAt).format("DD-MM-YYYY ")}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => approveAdmission(student._id)}
                      className="bg-teal-600 text-white  px-4 py-2 rounded-3xl"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admissions;
