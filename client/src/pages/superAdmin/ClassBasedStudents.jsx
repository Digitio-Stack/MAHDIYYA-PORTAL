import React, { useEffect, useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { Link, useLocation, useParams } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";

function AllStudents() {
  const { classId } = useParams();
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [className, setClassName] = useState(null);

  const [file, setFile] = useState(null);
  const getClass = async () => {
    try {
      let { data } = await Axios.get(`/class/${classId}`);
      setClassName(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getStudents = async () => {
    try {
      let { data } = await Axios.get(`/student/my-students/data/${classId}`);
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleExcelUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("class", classId);
    try {
      let res = await Axios.post("/student/excel", formData);
      if (res.status === 200) {
        alert("File uploaded successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getStudents();
    window.scrollTo(0, 0);
  }, [location, classId]);

  useEffect(() => {
    getClass();
  }, [classId]);

  if (students.length < 0) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col ml-6">
        <h3 className="text-4xl text-center font-bold text-green-900 uppercase my-4">
          {className?.className} 
        </h3>

        <div className="mx-auto ">
          <div className="flex"></div>
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {!showModal ? (
                <StudentsTable setShowModal={setShowModal}students={students} />
              ) : (
                <>
                  {
                    <div className="p-6 space-y-6">
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-blue-900 dark:text-gray-300"
                          htmlFor="file_input"
                        >
                          upload excel file here..
                        </label>
                        <input
                          className="block w-full text-sm text-blue-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="file_input"
                          type="file"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                            ExcelRenderer(e.target.files[0], (err, resp) => {
                              console.log(resp);
                              if (err) {
                                console.log(err);
                              } else {
                                setCols(resp.cols);
                                setRows(resp.rows);
                              }
                            });
                          }}
                        />
                        {rows.length > 0 && (
                          <div className="overflow-x-auto">
                            <table className="table-auto border-collapse border border-gray-800 mx-auto my-5">
                              <thead>
                                <tr className="bg-gray-800 text-white">
                                  {cols.map((col, index) => (
                                    <th key={index} className="px-4 py-2">
                                      {col.name}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {rows.map((row, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    className={
                                      row.some((cell) => cell.trim() === "")
                                        ? "text-red-500"
                                        : ""
                                    }
                                  >
                                    <td className="border px-4 py-2">
                                      {rowIndex}
                                    </td>
                                    {row.map((cell, cellIndex) => (
                                      <td
                                        key={cellIndex}
                                        className={`border px-4 py-2 ${
                                          rowIndex === 0 ? "font-bold" : ""
                                        }`}
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        <button
                          onClick={(e) => handleExcelUpload(e)}
                          className="bg-green-400 text-white float-right font-bold px-3 py-2 mt-3"
                        >
                          Upload{" "}
                        </button>

                        <button
                          onClick={(e) => setShowModal(!showModal)}
                          className="bg-red-600 mr-3 text-white float-right font-bold px-3 py-2 mt-3"
                        >
                          close
                        </button>
                      </div>
                    </div>
                  }
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StudentsTable({ setShowModal,students }) {
  return (
    <div className="sm:-mx-6 lg:-mx-8 w-full">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          { (
            <button
              onClick={(e) => setShowModal(true)}
              className="bg-green-500 px-3 py-2 w-full font-bold text-white hover:bg-green-600 rounded-md"
            >
              Add Students
            </button>
          )}
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          <table className="bg-gray-200 w-full border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm  text-gray-700">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm  text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm  text-gray-700">
                  Register No
                </th>
                <th className="px-6 py-3 text-left text-sm  text-gray-700">
                  Place
                </th>
                <th className="px-6 py-3 text-left text-sm  text-gray-700">
                  District{" "}
                </th>
                <th className="px-6 py-3 text-left text-sm  text-gray-700">
                  Phone{" "}
                </th>
                <th className="px-6 py-3 text-left text-sm  text-gray-700">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={"/profile/" + student._id}
                      className="text-blue-600 hover:underline"
                    >
                      {student.studentName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.registerNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.place}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.district}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/edit-student/${student._id}`}
                      className="text-blue-700"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllStudents;
