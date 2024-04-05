import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../Axios";
import HtmlViewer from "./HtmlViewer";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  const getCourseDetails = async () => {
    try {
      let { data } = await Axios.get(`/course/${id}`);
      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, [id]);

  return (
    <article className="px-6 text-left max-w-3xl  py-24 mx-auto space-y-12 ">
      <img src={`/course/${course?.image}`} className="rounded-[20px]" alt="" />
      <div className="mx-auto space-y-4">
        <p className="text-xs font-semibold tracking-wider uppercase">
          CPET COURSES
        </p>
      </div>
      <div className="bg-gray-100 p-3 rounded-[20px]">
        <h1 className="text-xl lg:text-3xl text-[#2b6f9a] font-bold">
          {course?.courseTitle}
        </h1>
        <div className="lg:flex lg:justify-between my-4">
          <div className="mb-4">
            <div className="flex px-3 py-1 items-center rounded-[20px] bg-[#2b6f9a] ">
              <p className="lg:text-xl text-sm text-white">Duration </p>
              <p className="ml-1 lg:text-xl text-sm text-white">
                {course?.duration}
              </p>
            </div>
          </div>
          <div>
            <div className="flex px-3 py-1 items-center rounded-[20px] bg-[#2b6f9a] ">
              <p className="lg:text-xl text-sm text-white"> Course Fee (₹)</p>
              <p className="ml-1 lg:text-xl text-sm  text-white">
                {course?.amount}
              </p>
            </div>
          </div>
        </div>
        <p>{course?.description}</p>
      </div>
      <h4 className="text-lg font-semibold my-4 uppercase">course details</h4>
      <HtmlViewer value={course?.details} />
    </article>
  );
}

export default CourseDetails;
