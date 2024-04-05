import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../../Axios";

function CourseTable() {
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    try {
      let { data } = await Axios.get("/course");
      setCourses(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteCourse = async (id) => {
    try {
      if (window.confirm("do you want to delete this course")) {
        let res = await Axios.delete(`/course/${id}`);
        getAllCourses();
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("something went wrong", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <>
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Course Name
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Duration
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                For
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Amount
              </th>

              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Edit
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course, index) => (
              <tr className="border-b">
                <td className="px-5 py-3 bg-white text-sm">{index + 1}</td>
                <td className="px-5 py-3 bg-white text-sm">
                  <a target={"_blank"} href={course.image}>
                    <img
                      src={`${course?.image}`}
                      className="w-[100px] object-cover h-[100px]"
                      alt={course.courseTitle}
                    />
                  </a>
                </td>
                <td className="px-5 py-3 bg-white text-sm">
                  {course.courseTitle}
                </td>
                <td className="px-5 py-3 bg-white text-sm">
                  {course.duration}
                </td>
                <td className="px-5 py-3 bg-white text-sm">
                  {course.courseFor}
                </td>
                <td className="px-5 py-3 bg-white text-sm">{course.amount}</td>

                <td className="px-5 py-3 bg-white text-sm">
                  <Link to={`/edit-course/${course._id}`}>
                    <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
                  </Link>
                </td>
                <td className="px-5 py-3 bg-white text-sm">
                  <FontAwesomeIcon
                    onClick={(e) => deleteCourse(course._id)}
                    icon={faTrash}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CourseTable;
