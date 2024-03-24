import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";

const StudentMarks = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [results, setResults] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState([]);

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
    const fetchExams = async () => {
      try {
        const response = await Axios.get("/exam");
        setExams(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExams();
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (selectedClass) {
        try {
          const response = await Axios.get(`/result?classId=${selectedClass}&examId=${selectedExam}`);
          console.log(response.data);
          setResults(response.data.results);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [selectedClass]);

  const extractSubjectNames = () => {
    const subjectNames = [];
    results.forEach((mark) => {
      if (!subjectNames.includes(mark.subject.subjectName)) {
        subjectNames.push(mark.subject.subjectName);
      }
    });
    return subjectNames;
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">Student Marks</h1>
      <div className="mb-4">
        <label className="block font-semibold mb-2" htmlFor="student">
          Select Exam:
        </label>
        <select
          id="class"
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option >Select Exam</option>
          {exams.map((examItem) => (
            <option className="text-black" key={examItem._id} value={examItem._id}>
              {examItem.examName}
            </option>
          ))}
        </select>
      </div>
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

      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          {selectedClass && (
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-800 p-2">Student</th>
                    {/* Render table headers with subject names */}
                    {extractSubjectNames().map((subjectName) => (
                      <th
                        key={subjectName}
                        className="border border-gray-800 p-2"
                      >
                        {subjectName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((studentResult) => (
                    <tr key={studentResult.student.$oid}>
                      <td className="border border-gray-800 p-2">
                        {studentResult.student.studentName}
                      </td>
                      {/* Render marks obtained for each subject */}
                      {extractSubjectNames().map((subjectName) => {
                        // Find the mark for the current student and subject
                        const mark = results.find(
                          (m) =>
                            m.student._id === studentResult.student._id &&
                            m.subject.subjectName === subjectName
                        );
                        // Render the marks obtained or "F" if no mark is found
                        return (
                          <td
                            key={subjectName}
                            className={`border border-gray-800 p-2 ${
                              mark.marksObtained >= 40
                                ? "bg-gray-200"
                                : "bg-red-400"
                            }`}
                          >
                            {mark ? mark.marksObtained : "F"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentMarks;
