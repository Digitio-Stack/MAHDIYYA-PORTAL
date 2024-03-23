import axios from "axios";
import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";

const StudentMarks = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await Axios.get("/class");
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await Axios.get(
          "/student/my-students/data/" + selectedClass
        );
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, [selectedClass]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (selectedStudent) {
        try {
          const response = await Axios.get(
            `/result?studentId=${selectedStudent}`
          );
          setResults(response.data.results);
          setResult(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [selectedStudent]);

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">Student Marks</h1>
      <div className="mb-4">
        <label className="block font-semibold mb-2" htmlFor="student">
          Select Class:
        </label>
        <select
          id="class"
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option hidden>Select class</option>
          {classes.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>
              {classItem.className}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2" htmlFor="student">
          Select Student:
        </label>
        <select
          id="student"
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option hidden>Select a student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.studentName}{" "}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          {selectedStudent && (
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border">Subject</th>
                    <th className="py-2 px-4 border">Marks Obtained</th>
                    <th className="py-2 px-4 border">Total Marks</th>
                    <th className="py-2 px-4 border">Status </th>
                  </tr>
                </thead>
                <tbody>
                  {results?.length > 0 ? (
                    results.map((result) => (
                      <tr
                        key={result._id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="py-2 px-4 border">
                          {result?.subject?.subjectName}
                        </td>
                        <td className="py-2 px-4 border">
                          {result?.marksObtained}
                        </td>
                        <td className="py-2 px-4 border">
                          {result?.subject?.totalMarks}
                        </td>
                        <td
                          className={`py-2 px-4 border ${
                            result.marksObtained >= 40
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {result.marksObtained >= 40 ? "P" : "F"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p className="text-gray-100 text-center bg-red-700 uppercase mt-5 ">
                      result not found
                    </p>
                  )}
                </tbody>
              </table>
              {results.length > 0 && (
                <div className="bg-gray-200 p-4">
                  <p
                    className={` text-white font-semibold  w-auto mt-2 ${
                      status === "Promoted" ? "text-green-500" : "text-red-600"
                    }`}
                  >
                    {result?.status}
                  </p>
                  <p className="text-gray-600 font-semibold mb-2 bg-gray-100 p-2">Grand Total: {result?.grandTotal}</p>
                  <p className="text-gray-600 font-semibold mb-2 bg-gray-100 p-2">Percentage: {result?.percentage}%</p>
                  <p className="text-gray-600 font-semibold mb-2 bg-gray-100 p-2">Out Of: {result?.totalPossibleMarks} Marks </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentMarks;
