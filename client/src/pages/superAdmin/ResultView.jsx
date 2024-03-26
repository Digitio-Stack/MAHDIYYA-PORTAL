import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import { useParams } from "react-router-dom";

function ResultView() {
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [branches, setBranches] = useState([]);

  const [classId, setClassId] = useState(null);
  const [examId, setExamId] = useState(null);
  const [branchId, setBranchId] = useState(null);

  const [results, setResults] = useState([]);

  const getBranches = async () => {
    try {
      let { data } = await Axios.get(`/branch`);
      setBranches(data.docs);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getClasses = async () => {
    try {
      let { data } = await Axios.get(`/class`);
      setClasses(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getExams = async () => {
    try {
      let { data } = await Axios.get(`/exam`);
      setExams(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getResults = async () => {
    try {
      let { data } = await Axios.get(
        `/result?examId=${examId}&classId=${classId}`
      );
      console.log(data);
      setResults(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getClasses();
    getBranches();
    getExams();
  }, []);
  useEffect(() => {
    if (examId && classId) {
      getResults();
    }
  }, [examId, classId]);

  const subjectNames = new Set();
  results.forEach((result) => {
    result.subjectResults.forEach((subjectResult) => {
      subjectNames.add(subjectResult.subject.subjectName);
    });
  });

  return (
    <div>
      <div className="flex gap-x-3 m-4">
        <select onChange={(e) => setClassId(e.target.value)}>
          <option hidden>select class </option>
          {classes.map((item, key) => (
            <option key={key} value={item._id}>
              {item.className}
            </option>
          ))}
        </select>
        <select onChange={(e) => setBranchId(e.target.value)}>
          <option hidden>select study centre </option>
          {branches.map((item, key) => (
            <option key={key} value={item._id}>
              {item.branchName}
            </option>
          ))}
        </select>
        <select onChange={(e) => setExamId(e.target.value)}>
          <option hidden>select exam </option>
          {exams.map((item, key) => (
            <option key={key} value={item._id}>
              {item.examName}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto m-10">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Student</th>
              {Array.from(subjectNames).map((subjectName) => (
                <th key={subjectName}>{subjectName}</th>
              ))}
              <th>Total Marks</th>
              <th>Percentage</th>
              <th>Rank</th>
              <th>Passed</th>
            </tr>
          </thead>
          <tbody>
            {results
              .filter((result) => result.student.branch === branchId)
              .map((result) => (
                <tr
                  key={result.student._id}
                  className="border-b border-neutral-200"
                >
                  <td>{result.student.studentName}</td>
                  {Array.from(subjectNames).map((subjectName) => {
                    const subjectResult = result.subjectResults.find((sr) => {
                      // console.log(sr);
                      return sr.subject.subjectName === subjectName;
                    });
                    return (
                      <td
                        className={`whitespace-nowrap text-center px-6 py-4 ${
                          subjectResult.marksObtained >= 40
                            ? "bg-gray-200"
                            : "bg-red-400"
                        }`}
                        key={subjectName}
                      >
                        {subjectResult
                          ? `${subjectResult.marksObtained} `
                          : "-"}
                      </td>
                    );
                  })}
                  <td className="whitespace-nowrap text-center px-6 py-4">
                    {result.marksObtained}
                  </td>
                  <td className="whitespace-nowrap text-center px-6 py-4">
                    {result.percentage.toFixed(2)}%
                  </td>
                  <td className="whitespace-nowrap text-center px-6 py-4">
                    {result.rank}
                  </td>
                  <td
                    className={`whitespace-nowrap text-center px-6 py-4 ${
                      result.passed
                        ? "bg-green-500 text-white"
                        : "bg-red-700 text-white"
                    }`}
                  >
                    {result.passed ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultView;
