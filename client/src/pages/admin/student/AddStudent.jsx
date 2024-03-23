import React, { useContext, useEffect, useState } from "react";
import Axios from "../../../Axios";
import { UserAuthContext } from "../../../context/user";
import { toast } from "react-toastify";

const AddStudent = () => {
  const { authData } = useContext(UserAuthContext);

  let currentYear = new Date().getFullYear().toString();
  let nextYear = (new Date().getFullYear() + 1).toString();

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [formData, setFormData] = useState({
    studentName: "",
    registerNo: "",
    houseName: "",
    fatherName: "",
    place: "",
    district: "",
    postOffice: "",
    pinCode: "",
    state: "",
    registerNo: "",
    dateOfBirth: "",
    phone: "",
    branch: "",
    branchCode: "",
    className: "",
    class: "",
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const forms = [
    {
      labelName: "Student Name",
      type: "text",
      name: "studentName",
      placeholder: "Enter Name",
      required: true,
      value: formData.studentName,
    },
    {
      labelName: "Register Number",
      type: "text",
      name: "registerNo",
      placeholder: "Enter Register Number",
      required: true,
      value: formData.registerNo,
    },
    {
      labelName: "House Name",
      type: "text",
      name: "houseName",
      placeholder: "Enter House Name",
      required: true,
      value: formData.houseName,
    },
    {
      labelName: "Father Name",
      type: "text",
      name: "fatherName",
      placeholder: "Enter Father's Name",
      required: true,
      value: formData.fatherName,
    },

    {
      labelName: "Phone Number",
      type: "number",
      name: "phone",
      placeholder: "Enter Phone Number",
      required: true,
      value: formData.phone,
    },
    {
      labelName: "Date Of Birth (DD-MM-YYYY)",
      type: "date",
      name: "dateOfBirth",
      placeholder: "DD-MM-YYYY",
      required: true,
      value: formData.dateOfBirth,
    },

    {
      labelName: "Place",
      type: "text",
      name: "place",
      placeholder: "Enter Place",
      required: true,
      value: formData.place,
    },
    {
      labelName: "Post Office",
      type: "text",
      name: "postOffice",
      placeholder: "Enter Post Office",
      required: true,
      value: formData.postOffice,
    },
    {
      labelName: "Pin Code",
      type: "number",
      name: "pinCode",
      placeholder: "Enter Your Pincode",
      required: true,
      value: formData.pinCode,
    },
    {
      labelName: "State",
      type: "text",
      name: "state",
      placeholder: "Enter Your State",
      required: true,
      value: formData.state,
    },
    {
      labelName: "District",
      type: "text",
      name: "district",
      placeholder: "Enter Your District",
      required: true,
      value: formData.district,
    },
  ];

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // Send form data to backend API endpoint
      const response = await Axios.post("/student/add", {
        ...formData,
        academicYear: currentYear + "-" + nextYear,
        branch: authData.branch._id,
      });

      setLoading(false);
      toast.success("Student Added", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
    }
  };
  const getAllClasses = async (e) => {
    try {
      // Send form data to backend API endpoint
      const response = await Axios.get("/class");
      setClasses(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  useEffect(() => {
    getAllClasses();
  }, []);
  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Student Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="state" className="block  text-sm font-bold mb-2">
            select class
          </label>
          <select
            id="state"
            name="class"
            onChange={onChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option hidden>Select a class</option>
            {classes.map((item, key) => (
              <option value={item._id} key={key}>
                {item.className}
              </option>
            ))}
          </select>
        </div>
        {forms.map((form, key) => (
          <div key={key} className="lg:col-span-1">
            <div className="px-4 sm:px-0">
              <label
                className="block  text-sm font-bold mb-2"
                htmlFor="username"
              >
                {form.labelName}
              </label>
              <input
                className="focus:ring-indigo-500 focus:border-indigo-500 appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none  uppercase"
                type={form.type}
                onChange={(e) => onChange(e)}
                required={form.required}
                placeholder={form.placeholder}
                name={form.name}
                value={form.value}
              />
              <div className="text-red-500 font-sm">{form.error}</div>
            </div>
          </div>
        ))}

        <div className="mt-4">
          {loading ? (
            <button className="inline-flex w-full items-center px-4 py-2 border border-transparent  shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              loading...
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex w-full items-center px-4 py-2 border border-transparent  shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
