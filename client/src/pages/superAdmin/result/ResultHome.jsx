import { faAdd, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Axios";
import { BarChart } from "@mui/x-charts/BarChart";

function ResultHome() {
  const [statistics, setStatistics] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);

  const getStatistics = async () => {
    try {
      let { data } = await Axios.get(
        `/result/statistics?examId=${selectedExam}`
      );
      setStatistics(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getExams = async () => {
      try {
        let { data } = await Axios.get(`/exam`);
        setExams(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getExams();
  }, []);
  useEffect(() => {
    selectedExam && getStatistics();
  }, [selectedExam]);
  const transformedData = statistics.map((item) => ({
    label: item.subjectName,
    passed: item.passed,
    failed: item.failed,
  }));

  const passedData = transformedData.map((item) => item.passed);
  const failedData = transformedData.map((item) => item.failed);
  const xLabels = transformedData.map((item) => item.label);

  return (
    <div className="w-full flex-col items-center justify-center">
      <h1 className="text-center font-bold text-3xl uppercase my-2">
        Result Section{" "}
      </h1>

      <div className="px-4 py-8  mt-5 grid grid-cols-1 lg:grid-cols-4 mx-auto">
        <Link to={"/result-view"} className="w-full p-2 cursor-pointer">
          <div className=" py-4 overflow-hidden  cursor-pointer bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
            <div className="flex">
              <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                <FontAwesomeIcon icon={faCheck} color="white"></FontAwesomeIcon>
              </div>
            </div>
            <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
              Check Results
            </h1>
          </div>
        </Link>
        <Link to={"/add-result"} className="w-full p-2 cursor-pointer">
          <div className=" py-4 overflow-hidden  cursor-pointer bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
            <div className="flex">
              <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                <FontAwesomeIcon icon={faAdd} color="white"></FontAwesomeIcon>
              </div>
            </div>
            <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
              Add Result
            </h1>
          </div>
        </Link>
        <Link to={"/edit-result"} className="w-full p-2 cursor-pointer">
          <div className=" py-4 overflow-hidden  cursor-pointer bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
            <div className="flex">
              <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                <FontAwesomeIcon icon={faEdit} color="white"></FontAwesomeIcon>
              </div>
            </div>
            <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
              Edit Result
            </h1>
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center my-5">
        <h2 className="font-bold text-3xl text-blue-600 my-4">
          Exam Result Statistics
        </h2>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  lg:w-1/2 w-full mx-auto my-2 p-2.5"
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option hidden>select exam </option>
          {exams.map((item, key) => (
            <option key={key} value={item._id}>
              {item.examName}
            </option>
          ))}
        </select>
        <h1 className=" text-blue-800 font-semibold px-2 uppercase">
          subject based
        </h1>
        {statistics.length > 0 && (
          <BarChart
            width={500}
            height={300}
            series={[
              { data: passedData, label: "Passed", id: "pvId", stack: "total" },
              { data: failedData, label: "Failed", id: "uvId", stack: "total" },
            ]}
            xAxis={[
              {
                data: xLabels,
                scaleType: "band",
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}

export default ResultHome;
