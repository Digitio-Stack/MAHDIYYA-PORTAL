import React, { useEffect, useState } from "react";
import Axios from "../Axios";

const StudentResultPage = () => {
  const [registerNumber, setRegisterNumber] = useState("");
  const [studentResults, setStudentResults] = useState([]);
  const [examId, setExamId] = useState(null);
  const [exams, setExams] = useState([]);
  const [resultData, setResultData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.get(`/result/${examId}/${registerNumber}`);
      setResultData(response.data);
      setStudentResults(response.data?.results);
    } catch (error) {
      console.error("Error fetching student results:", error);
    }
  };

 
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await Axios.get(`/exam`);
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching student results:", error);
      }
    };
    fetchExams();
  }, []);
  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="registerNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Register Number:
          </label>
          <input
            type="text"
            id="registerNumber"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="examSelect"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select Exam:
          </label>
          <select
            id="examSelect"
            onChange={(e) => setExamId(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select Exam</option>
            {exams.map((item, key) => (
              <option key={key} value={item._id}>
                {item.examName}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>

      {studentResults.length > 0 && (
        <div className="bg-gray-100 p-5 ">
          <table className="lg:w-1/2 w-full px-3 mx-auto border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-800 p-2 text-sm">Subject</th>
                <th className="border border-gray-800 p-2 text-sm">Result</th>
                <th className="border border-gray-800 p-2 text-sm">Total</th>
                <th className="border border-gray-800 p-2 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentResults.length > 0 &&
                studentResults.map((result) => (
                  <tr key={result._id.$oid}>
                    <td className="border border-gray-800 p-2">
                      {result.subject?.subjectName}
                    </td>
                    <td className="border border-gray-800 p-2">
                      {result.marksObtained}
                    </td>
                    <td className="border border-gray-800 p-2">
                      {result?.subject?.totalMarks}
                    </td>
                    <td
                      className={`border border-gray-800 p-2 ${
                        result.marksObtained >= 40
                          ? "bg-green-100"
                          : "bg-red-400"
                      }`}
                    >
                      {result.marksObtained >= 40 ? "P" : "F"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mx-auto text-center bg-gray-300 mt-2 p-3">
            <p className="text-gray-900">
              Grand Total: {resultData.grandTotal}
            </p>
            <p className="text-gray-900">
              Status:
              {resultData.status
                ? "Promoted"
                : "Not Promoted"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResultPage;
