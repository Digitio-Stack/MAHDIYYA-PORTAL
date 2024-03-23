import React, { useEffect, useState } from "react";
import Axios from "../../../Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function AllTeachers() {
  const [teachers, setTeachers] = useState([]);

  const getTeachers = async () => {
    try {
      let { data } = await Axios.get("/teacher");
      console.log(data);
      setTeachers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeachers();
  }, []);
  return (
    <div>
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
            >
              #
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
            >
              Name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
            >
              Gender
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
            >
              Phone
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 &&
            teachers.map((teacher, i) => (
              <tr className="border-b ">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                  {i + 1}
                </td>
                <td className="text-sm   text-blue-900 hover:text-blue-700 font-semibold cursor-pointer px-6 py-4 whitespace-nowrap">
                  <Link to={`/teacher/${teacher._id}`}>
                    {teacher.teacherName}
                  </Link>
                </td>
                <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                  {teacher.email}
                </td>
                <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                  {teacher.gender}
                </td>
                <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                  {teacher.phone}
                </td>

                <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link to={`/edit-teacher/${teacher._id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllTeachers;
