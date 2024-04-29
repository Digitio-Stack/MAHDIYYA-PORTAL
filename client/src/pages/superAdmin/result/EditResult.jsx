import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import { toast } from "react-toastify";

function EditResult() {
  const [classes, setClasses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [exam, setExam] = useState(null);
  const [subject, setSubject] = useState(null);
  const [exams, setExams] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [results, setResults] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const getAllClasses = async () => {
    try {
      const response = await Axios.get("/class");
      setClasses(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllBranches = async () => {
    try {
      const response = await Axios.get("/study-centre?sort=studyCentreName");
      // console.log(response.data);
      setBranches(response.data.docs);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllExams = async () => {
    try {
      const response = await Axios.get("/exam");
      setExams(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllSubjects = async () => {
    try {
      const response = await Axios.get("/subject");
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await Axios.get(
        `/result/fetch?examId=${exam}&subjectId=${subject}&classId=${selectedClass}`
      );

      setResults(response.data);
      setUpdatedData(response.data.map((item) => ({ ...item }))); // Create a copy of fetched data for editing
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkChange = (index, newMarks) => {
    setUpdatedData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], marksObtained: newMarks }; // Update marksObtained for the corresponding item
      return newData;
    });
  };

 
  const handleSubmit = async () => {
    try {
     
      const response = await Axios.patch(
        `/result?examId=${exam}&subjectId=${subject}&classId=${selectedClass}`,
        updatedData
      );
      console.log(response.data);
      if (response.status === 200) {
        setResults([]);
        toast.success("Result Edited", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
        // window.location.reload()
      }
    } catch (error) {
      console.error("Error updating marks:", error);
    }
  };
  useEffect(() => {
    getAllClasses();
    getAllExams();
    getAllSubjects();
    getAllBranches();
  }, []);

  useEffect(() => {
    if (subject && selectedClass && exam) {
      fetchResults();
    }
  }, [subject, selectedClass, exam]);
  return (
    <div>
      <h1 className="text-center font-bold uppercase text-3xl my-4">
        Edit Result{" "}
      </h1>
      <div className="bg-gray-50 flex-col flex items-center justify-center">
        <div className="mb-4 w-1/2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="class">
            Class
          </label>
          <select
            className="shadow appearance-none border rounded w-full mx-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="class"
            type="text"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option hidden>select a class</option>
            {classes.map((classItem, key) => (
              <option value={classItem._id} key={key}>
                {classItem.className}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-1/2 ">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="class">
            Subject
          </label>
          <select
            className="shadow appearance-none border rounded w-full mx-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="class"
            type="text"
            onChange={(e) => setSubject(e.target.value)}
          >
            <option hidden>select subject</option>
            {selectedClass &&
              subjects
                .filter((item) => item.class?._id === selectedClass)
                .map((subjectItems, key) => (
                  <option value={subjectItems._id} key={key}>
                    {subjectItems.subjectName} {subjectItems.subjectCode}
                  </option>
                ))}
          </select>
        </div>

        <div className="mb-4 w-1/2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="class">
            Study Centre
          </label>
          <select
            className="shadow appearance-none border rounded w-full mx-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="branch"
            type="text"
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option hidden>select study centre</option>
            {branches.map((branch, key) => (
              <option value={branch._id} key={key}>
                {branch.studyCentreName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 w-1/2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="class">
            Exam{" "}
          </label>
          <select
            className="shadow appearance-none border rounded w-full mx-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="exam"
            type="text"
            onChange={(e) => setExam(e.target.value)}
          >
            <option hidden>select exam</option>
            {exams.length > 0 &&
              exams.map((examItem, key) => (
                <option value={examItem._id} key={key}>
                  {examItem.examName}
                </option>
              ))}
          </select>
        </div>
        <div className="w-1/2 mx-auto flex-col items-center justify-center flex">
          <h1 className="px-3 text-green-500 bg-gray-100 text-center">
            Results Fetched Successfully
          </h1>
          {selectedBranch && results.length > 0 && (
            <>
              <table className="bg-gray-200 rounded-md my-2 p-4">
                <thead>
                  <tr>
                    <th className="text-gray-800 px-4 py-2">Register No</th>
                    <th className="text-gray-800 px-4 py-2">Student Name</th>
                    <th className="text-gray-800 px-4 py-2">Previous Mark</th>
                    <th className="text-gray-800 px-4 py-2">Updated Mark </th>
                  </tr>
                </thead>
                <tbody>
                  {results
                    .filter((item) => item.student.branch === selectedBranch)
                    .map((result, key) => (
                      <tr key={key}>
                        <td className="px-4 py-2">
                          {result.student.registerNo}
                        </td>
                        <td className="px-4 py-2">
                          {result.student.studentName}
                        </td>
                        <td className="px-4 py-2">
                          <input
                            className="py-3 hover:cursor-not-allowed px-4 block w-20 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            // disabled
                            value={result.marksObtained}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            // value={result.marksObtained}
                            onChange={(e) =>
                              handleMarkChange(key, e.target.value)
                            }
                            onWheel={(e) => e.target.blur()}
                            className="py-3 px-4 block w-20 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            min={0}
                            max={100}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
          <button
            onClick={(e) => handleSubmit(e)}
            className="lg:w-1/2 w-full mx-auto  bg-green-500 text-white p-3 font-bold uppercase my-5 hover:bg-green-400"
          >
            Edit Results{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditResult;
