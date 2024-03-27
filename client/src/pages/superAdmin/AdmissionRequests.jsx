import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "../../Axios";

function AdmissionRequests() {
  const [admissions, setAdmissions] = useState([]);

  const getAllRequests = async () => {
    try {
      let { data } = await Axios.get(`/student/admissions/data`);
      setAdmissions(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(admissions);
  useEffect(() => {
    getAllRequests();
  }, []);
  return (
    <div>
      <h1 className="text-center font-bold text-3xl uppercase text-sky-800 my-5">
        Admission Requests
      </h1>
      {admissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-800 mx-auto my-5">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Centre </th>
                <th className="px-4 py-2">Class </th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((item, key) => (
                <tr key={key} className="bg-gray-100">
                  <td className="border px-4 py-2">{item?.studentName}</td>
                  <td className="border px-4 py-2">
                    {item?.branch?.studyCentreName}
                  </td>
                  <td className="border px-4 py-2">{item?.class?.className}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center font-bold text-xl uppercase text-blue-900 my-5">
          There is no pending requests
        </h1>
      )}
    </div>
  );
}

export default AdmissionRequests;
