import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const AddResult = () => {
  const { pathname } = useLocation();
  const [exam, setExam] = useState(null);
  const [subject, setSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);

  const [classes, setClasses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [exams, setExams] = useState([]);

  const [studentMarks, setStudentMarks] = useState(
    students.reduce((acc, student) => {
      acc[student._id] = student.marks || "0";
      return acc;
    }, {})
  );

  const handleMarkChange = (studentId, newMarks) => {
    setStudentMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: newMarks,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const results = students.map((student) => ({
        student: student._id,
        exam: exam, // Assuming exam is the subject
        marksObtained: studentMarks[student._id],
        class: selectedClass,
        subject,
      }));
      setLoading(true);
      const response = await Axios.post("/result", results);
      if (response.status === 201) {
        toast.success("Mark Added", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setLoading(false);
        getGlobalResults();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

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
      const response = await Axios.get("/branch?sort=branchName");
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
  const getStudents = async () => {
    try {
      const response = await Axios.get(
        `/student/data/${selectedBranch}/${selectedClass}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getGlobalResults = async () => {
    try {
      const response = await Axios.get(`/result/data`);
      console.log(response.data);
      setResults(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    getStudents();
  }, [selectedClass, selectedBranch]);

  useEffect(() => {
    getAllClasses();
    getAllExams();
    getAllSubjects();
    getAllBranches();
    getGlobalResults();
  }, [pathname]);
  return (
    <div className=" mt-8">
      <div className="max-w-md mx-auto ">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Result</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="class">
            Subject
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="class"
            type="text"
            onChange={(e) => setSubject(e.target.value)}
          >
            <option hidden>select subject</option>
            {subjects.map((subjectItems, key) => (
              <option value={subjectItems._id} key={key}>
                {subjectItems.subjectName} {subjectItems.subjectCode}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="class">
            Class
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="class">
            Study Centre
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="branch"
            type="text"
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option hidden>select a branch</option>
            {branches.map((branch, key) => (
              <option value={branch._id} key={key}>
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="class">
            Exam{" "}
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="border border-gray-700 px-2">
                    {student.studentName}
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder=""
                      // value={studentMarks[student._id] || ""}
                      defaultValue={"0"}
                      className="w-20"
                      onChange={(e) =>
                        handleMarkChange(student._id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading ? (
            <button className="bg-blue-900 text-white w-full mt-4 py-3 font-bold">
              Uploading...
            </button>
          ) : (
            <button
              className="bg-blue-900 text-white w-full mt-4 py-3 font-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      <div className="py-4 max-w-3xl mx-auto my-7">
        <h2 className="text-lg font-semibold mb-2 text-center">
          Submitted Results
        </h2>
        <table className="w-full border-collapse bg-blue-100 border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Study Centre</th>
              <th className="border border-gray-300 px-4 py-2">Centre Code</th>
              <th className="border border-gray-300 px-4 py-2">Class</th>
              <th className="border border-gray-300 px-4 py-2">Subject </th>
              <th className="border border-gray-300 px-4 py-2">Documents </th>
              {/* Optionally, you can add more columns here */}
            </tr>
          </thead>
          <tbody>
            {results.map((resultGroup, key) => (
              <tr
                key={`${resultGroup._id.branch}-${resultGroup._id.class}`}
                className="hover:bg-gray-100"
              >
                <td className="border border-gray-300 px-4 py-2">{key + 1}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {resultGroup?._id?.branch}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {resultGroup?._id?.branchCode}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {resultGroup?._id?.class}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {resultGroup?._id?.subject}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {resultGroup?.count}
                </td>
                {/* Optionally, you can display additional data here */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddResult;
