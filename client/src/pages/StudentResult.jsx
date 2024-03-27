import React, { useEffect, useState } from "react";
import Axios from "../Axios";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

const StudentResultPage = () => {
  const ref = useRef();

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
        <>
          <div className="bg-gray-50 my-4  p-10 shadow-lg" ref={ref}>
            <img src="/logo.png" className="h-28 mx-auto" alt="" />

            <div className="p-4">
              <p className="text-lg font-semibold bg-gray-500 text-white p-3 mb-2 text-center uppercase">
                {studentResults[0]?.exam?.examName}
              </p>
              <p className="text-gray-700 mb-1">
                Student Name: {studentResults[0]?.student?.studentName}
              </p>
              <p className="text-gray-700 mb-1">
                Register No: {resultData?.student?.registerNo}
              </p>
              <p className="text-gray-700 mb-1">
                Study Centre : {resultData?.student?.branch?.studyCentreName}
              </p>
              <p className="text-gray-700 mb-4">
                {resultData?.student?.class?.className}
              </p>
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                    Subject
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                    Result
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentResults.map((result) => (
                  <tr key={result._id}>
                    <td className="px-4 py-3 text-center">
                      {result.subject?.subjectName}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {result.marksObtained}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {result?.subject?.totalMarks}
                    </td>
                    <td
                      className={`px-4 py-3 text-center ${
                        result.marksObtained >= 40
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {result.marksObtained >= 40 ? "P" : "F"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mx-auto bg-gray-100  lg:flex  flex-col justify-center lg:justify-around items-center mt-4 p-4">
              <p className="text-gray-800 font-semibold p-2">
                Grand Total: {resultData.grandTotal}
              </p>
              <p className="text-gray-800 font-semibold p-2">
                Percentage: {resultData.percentage}%
              </p>
              <p
                className={`text-gray-200 p-1 font-semibold  ${
                  resultData.passed ? "bg-green-500" : "bg-red-500"
                }`}
              >
                Status: {resultData.passed ? "Promoted" : "Not Promoted"}
              </p>
              <p className="text-gray-800 font-semibold p-2">
                Rank: {resultData.studentRank}
              </p>
            </div>
            <div className="p-3 text-center bg-gray-300 mt-4">
              <h1 className="font-semibold text-gray-600">CPET DARUL HUDA </h1>
              <a href="https://cpetdhiu.in">cpetdhiu.in </a>
            </div>
          </div>
          <ReactToPrint
            bodyClass="print-agreement"
            content={() => ref.current}
            documentTitle={
              resultData?.student?.studentName +
              "-" +
              resultData?.student?.registerNo
            }
            trigger={() => (
              <div className="flex flex-col ">
                <button
                  className="text-center bg-green-500 px-2 py-1 text-white mx-auto"
                  type="primary"
                >
                  Print Result
                </button>
              </div>
            )}
          />
        </>
      )}
    </div>
  );
};

export default StudentResultPage;
