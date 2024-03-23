import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import AddSubjectBasedResult from "./AddSubjectBased";

const AddResult = () => {
  const [student, setStudent] = useState(null);
  const [exam, setExam] = useState(null);
  const [marksObtained, setMarksObtained] = useState(null);
  const [subject, setSubject] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [exams, setExams] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!exam || !student || !selectedClass || !marksObtained || !subject) {
      setError("Please enter all fields");
    } else {
      try {
        setLoading(true);
        const response = await Axios.post("/result", {
          student,
          exam,
          marksObtained,
          class: selectedClass,
          subject,
        });
        if (response.status === 201) {
          setLoading(false);
          setStudent("");
          setMarksObtained("");
          setError("");
        }
      } catch (error) {
        setLoading(false);
        setError(error?.response?.data?.error);
      }
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
        `/student/my-students/data/${selectedClass}`
      );
      console.log(response.data);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllClasses();
    getAllExams();
    getAllSubjects();
  }, []);

  useEffect(() => {
    getStudents();
  }, [selectedClass]);
  return (
    <div className="max-w-md mx-auto mt-8">
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
              {subjectItems.subjectName}
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
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 my-5 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {error && (
          <p className="text-center font-semibold text-red-700">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="class">
            Student
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="student"
            type="text"
            onChange={(e) => setStudent(e.target.value)}
            value={student}
          >
            <option hidden>select a student</option>
            {students.map((student, key) => (
              <option value={student._id} key={key}>
                {student.studentName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="marksObtained"
          >
            Marks Obtained
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="marksObtained"
            type="number"
            placeholder="Enter marks obtained"
            value={marksObtained}
            onChange={(e) => setMarksObtained(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          {loading ? (
            <button className="bg-gray-900 hover:bg-gray-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Processing...
            </button>
          ) : (
            <button
              className="bg-gray-900 hover:bg-gray-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Result
            </button>
          )}
        </div>
      </form>
      <AddSubjectBasedResult
        selectedClass={selectedClass}
        selectedSubject={subject}
      />
    </div>
  );
};

export default AddResult;
