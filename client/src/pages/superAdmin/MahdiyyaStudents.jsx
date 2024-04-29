import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import Axios from "../../Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function MahdiyyaStudents() {
  const tableRef = useRef(null);

  const [students, setStudents] = useState([]);
  const [classId, setClassId] = useState("");
  const [studyCentre, setStudyCentre] = useState("");
  const [studyCentres, setStudyCentres] = useState([]);
  const [classes, setClasses] = useState([]);

  const getStudyCentres = async () => {
    try {
      let { data } = await Axios.get("/study-centre");
      setStudyCentres(data.docs);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getClasses = async () => {
    try {
      let { data } = await Axios.get("/class");
      console.log(data);
      setClasses(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getStudents = async () => {
    try {
      let { data } = await Axios.get(
        `/student?classId=${classId}&studyCentre=${studyCentre}`
      );
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasses();
    getStudyCentres();
  }, []);

  useEffect(() => {
    getStudents();
  }, [classId, studyCentre]);
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center my-5 uppercase">
          All Students{" "}
        </h1>
        <form className="max-w-sm mx-auto my-4">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a study centre
          </label>
          <select
            id="countries"
            onChange={(e) => setStudyCentre(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a study centre</option>
            {studyCentres.length > 0 &&
              studyCentres.map((item, key) => (
                <option value={item._id}>{item?.studyCentreName}</option>
              ))}
          </select>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a class
          </label>
          <select
            id="countries"
            onChange={(e) => setClassId(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a class</option>
            {classes.length > 0 &&
              classes.map((item, key) => (
                <option value={item._id}>{item?.className}</option>
              ))}
          </select>
          <div className="flex justify-between  items-center">
            <p className="text-green-500 my-3">{students.length} students</p>

            {students.length > 0 && (
              <DownloadTableExcel
                filename="Students"
                sheet="Students"
                currentTableRef={tableRef.current}
              >
                <button className="bg-green-400 px-3 py-1 text-white font-semibold rounded-2xl">
                  Download <FontAwesomeIcon icon={faDownload} />
                </button>
              </DownloadTableExcel>
            )}
          </div>
        </form>

        <table ref={tableRef} className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>

              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                REG. NO
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                NAME
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                FATHER
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                HOUSE
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                PLACE
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                PO
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                PINCODE
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                DISTRICT
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATE
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                PHONE
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                DOB
              </th>

              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                CLASS
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                STUDY CENTRE
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                CENTRE CODE
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {students.map((student, key) => (
              <tr key={student._id}>
                <td className=" text-sm text-center text-gray-600 p-2">
                  {key + 1}
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  {student.registerNo}
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-40"> {student.studentName}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-40"> {student.fatherName}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-40"> {student.houseName}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-40">{student.place}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-40">{student.postOffice}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  {student.pinCode}
                </td>
                <td className=" text-sm text-center  text-gray-600 p-2">
                  <p className="w-40">{student.district}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-40">{student.state}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-40">{student.phone}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-40">{student.dateOfBirth}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-40">{student.class.className}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  <p className="w-60">{student.branch.studyCentreName}</p>
                </td>
                <td className=" text-sm text-center text-gray-600 p-2">
                  {student.branch.studyCentreCode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MahdiyyaStudents;
