import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import * as XLSX from "xlsx";

function MahdiyyaStudents() {
  const [branchStudentCounts, setBranchStudentCounts] = useState([]);
  const [expandedBranches, setExpandedBranches] = useState([]);

  const getStudents = async () => {
    try {
      let { data } = await Axios.get("/student");
      console.log(data);
      setBranchStudentCounts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const filterStudents = async (branchId, classId) => {
    try {
      let { data } = await Axios.get(
        `/student?branch=${branchId}&class=${classId}`
      );
      
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Students");

      // Generate a download link for the Excel file
      XLSX.writeFile(wb, "student_data.xlsx");
    } catch (error) {
      console.log(error);
    }
  };
  const toggleExpansion = (branchName) => {
    setExpandedBranches((prevExpanded) => {
      if (prevExpanded.includes(branchName)) {
        return prevExpanded.filter((item) => item !== branchName);
      } else {
        return [...prevExpanded, branchName];
      }
    });
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
                Centre Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Centre Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {branchStudentCounts.map((branch) => (
              <React.Fragment key={branch.branchName}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {branch.branchName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {branch.branchCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {branch.classes.length > 0 && (
                      <button
                        className="text-blue-500 underline"
                        onClick={() => toggleExpansion(branch.branchName)}
                      >
                        {expandedBranches.includes(branch.branchName)
                          ? "Show Less"
                          : "Show More"}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {branch.studentCount}
                  </td>
                </tr>
                {expandedBranches.includes(branch.branchName) &&
                  branch.classes.map((cls) => (
                    <tr key={`${branch.branchName}-${cls.className}`}>
                      <td className="px-6 py-4 whitespace-nowrap"></td>
                      <td className="px-6 py-4 whitespace-nowrap"></td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cls.className}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cls.studentCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            filterStudents(branch.branchId, cls.classId)
                          }
                          className="bg-gray-800 px-3 py-1 text-white rounded-3xl"
                        >
                          Download{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MahdiyyaStudents;
