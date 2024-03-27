import { faBookReader, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../../Axios";

function StudyCentreView() {
  const { centreId } = useParams();
  const [studyCentre, setStudyCentre] = useState(null);

  const getStudyCentre = async () => {
    try {
      let { data } = await Axios.get(`/study-centre/${centreId}`);
      setStudyCentre(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getStudyCentre();
  }, []);
  return (
    <div>
      <h1 className="text-center font-bold text-3xl mb-3 p-8 text-white bg-gray-900">
        {studyCentre?.studyCentreName}
      </h1>
      <div className="px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-4">
        <div className="w-full p-2 cursor-pointer">
          <div className=" py-4 overflow-hidden  cursor-pointer bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
            <div className="flex">
              <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                <FontAwesomeIcon
                  icon={faBookReader}
                  color="white"
                ></FontAwesomeIcon>
              </div>
            </div>
            <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
              100 Students
            </h1>
          </div>
        </div>
        <div className="w-full p-2 cursor-pointer">
          <div className=" py-4 overflow-hidden  cursor-pointer bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
            <div className="flex">
              <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  color="white"
                ></FontAwesomeIcon>
              </div>
            </div>
            <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
              10 Teachers
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCentreView;
