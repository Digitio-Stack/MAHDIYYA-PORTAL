import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../../Axios";

const AddResult = () => {
  const { pathname } = useLocation();
  const [exam, setExam] = useState(null);
  const [subject, setSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

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
  

  useEffect(() => {
    getStudents();
  }, [selectedClass, selectedBranch]);

  useEffect(() => {
    getAllClasses();
    getAllExams();
    getAllSubjects();
    getAllBranches();
  }, [pathname]);
  return (
    <div className=" mt-8">
      <div className="max-w-md mx-auto ">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Result</h2>
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
            <option hidden>select study centre</option>
            {branches.map((branch, key) => (
              <option value={branch._id} key={key}>
                {branch.studyCentreName}
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
            Subject
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

     
    </div>
  );
};

export default AddResult;
