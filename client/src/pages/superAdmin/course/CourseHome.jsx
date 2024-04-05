import {
  faCheck,
  faList,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function CourseHome() {
  return (
    <>
    <h1 className="text-center font-bold text-3xl  my-6">CPET Courses </h1>
      <div className="flex justify-center items-center">
        <Link to={"/course-table"} className="w-full p-2 cursor-pointer">
          <div className=" py-4 overflow-hidden  cursor-pointer bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
            <div className="flex">
              <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                <FontAwesomeIcon icon={faList} color="white"></FontAwesomeIcon>
              </div>
            </div>
            <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
              Courses
            </h1>
          </div>
        </Link>
        <Link to={"/create-course"} className="w-full p-2 cursor-pointer">
          <div className=" py-4 overflow-hidden  cursor-pointer bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
            <div className="flex">
              <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  color="white"
                ></FontAwesomeIcon>
              </div>
            </div>
            <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
              Courses
            </h1>
          </div>
        </Link>
      </div>
    </>
  );
}

export default CourseHome;
