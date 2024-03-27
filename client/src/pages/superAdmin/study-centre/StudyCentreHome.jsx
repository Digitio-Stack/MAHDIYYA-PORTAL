import React from "react";
import { Link } from "react-router-dom";
import {
  faAdd,
  faBuildingCircleArrowRight,
  faCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StudyCentreHome() {
  return (
    <div>
      <div className="px-4 py-8  mt-5 grid grid-cols-1 lg:grid-cols-4 mx-auto">
        <Link to={"/study-centres"} className="w-full p-2 cursor-pointer">
          <div className=" py-4 overflow-hidden  cursor-pointer bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
            <div className="flex">
              <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                <FontAwesomeIcon
                  icon={faBuildingCircleArrowRight}
                  color="white"
                ></FontAwesomeIcon>
              </div>
            </div>
            <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
              Study Centres
            </h1>
          </div>
        </Link>
        <Link to={"/create-study-centre"} className="w-full p-2 cursor-pointer">
          <div className=" py-4 overflow-hidden  cursor-pointer bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
            <div className="flex">
              <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                <FontAwesomeIcon icon={faAdd} color="white"></FontAwesomeIcon>
              </div>
            </div>
            <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
              New Study Centre
            </h1>
          </div>
        </Link>
        
      </div>
    </div>
  );
}

export default StudyCentreHome;
