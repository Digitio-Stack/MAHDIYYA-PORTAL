import axios from "axios";
import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";

const AddSubjectBasedResult = ({ selectedClass, selectedSubject }) => {
  const [subjectId, setSubjectId] = useState("");
  const [examId, setExamId] = useState("");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch students for the subject
    const fetchStudents = async () => {
      try {
        const response = await Axios.get(`/student?class=${selectedClass}`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    const fetchSubjects = async () => {
      try {
        const response = await Axios.get(`/subject`);
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
    fetchSubjects();
  }, [selectedClass, selectedSubject]);

  const handleAddStudentMarks = async () => {
    try {
      const response = await axios.post(
        "/api/results/createResultsForSubject",
        {
          subjectId,
          examId,
          studentMarks: Object.entries(marks).map(([studentId, mark]) => ({
            studentId,
            marksObtained: mark,
          })),
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response.data.message ||
          "An error occurred while adding student marks."
      );
    }
  };

  const handleMarkChange = (studentId, event) => {
    const updatedMarks = { ...marks };
    updatedMarks[studentId] = event.target.value;
    setMarks(updatedMarks);
  };

  return (
    <div>
      <label htmlFor="subjectId">Subject ID:</label>
      <input
        type="text"
        id="subjectId"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      />
      <br />

      <label htmlFor="examId">Exam ID:</label>
      <input
        type="text"
        id="examId"
        value={examId}
        onChange={(e) => setExamId(e.target.value)}
      />
      <br />

      <h3>Enter Student Marks:</h3>
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
              <td>{student.name}</td>
              <td>
                <input
                  type="text"
                  value={marks[student._id] || ""}
                  onChange={(e) => handleMarkChange(student._id, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      <button onClick={handleAddStudentMarks}>Add Student Marks</button>
      <br />

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddSubjectBasedResult;
