import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Axios from "../../Axios";

function MahdiyyaStudents() {
  const [studentCounts, setStudentCounts] = useState([]);

  const getStudents = async () => {
    try {
      let { data } = await Axios.get("/student");
      setStudentCounts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const filterStudents = async (studyCentreId, classId) => {
    try {
      let { data } = await Axios.get(
        `/student?branch=${studyCentreId}&class=${classId}`
      );
      console.log(data);
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Students");

      // Generate a download link for the Excel file
      XLSX.writeFile(
        wb,
        `${
          data[0]?.branch[0].studyCentreName + "-" + data[0]?.class[0].className
        }.xlsx`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center my-5">
          All Students{" "}
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Centre Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Centre Name
              </th>
              {studentCounts.length > 0 &&
                studentCounts[0].classes.map((classItem) => (
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    key={classItem.className}
                  >
                    {classItem.className}
                  </th>
                ))}

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studentCounts.map((branch) => (
              <tr key={branch._id}>
                <td className="text-center">{branch.studyCentreCode}</td>
                <td className="text-center">{branch._id}</td>
                {branch.classes.map((classItem) => (
                  <td className="text-center" key={classItem.className}>
                    {classItem.studentCount}
                  </td>
                ))}
           
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MahdiyyaStudents;
