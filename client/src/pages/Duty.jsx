import React, { useState } from "react";
import Axios from "../Axios";

function InstitutionData() {
  const [caNumber, setCaNumber] = useState("");
  const [institutionData, setInstitutionData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setCaNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.get(`/duty/${caNumber}`);
      setError(null);
      setInstitutionData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Find Institution Duty Date </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <input
          type="text"
          value={caNumber}
          onChange={handleChange}
          placeholder="Enter CA Number"
          className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          FInd Now{" "}
        </button>
      </form>
      {institutionData && (
        <div className="text-center mt-8">
          <h3 className="text-xl font-semibold mb-2">Institution</h3>
          <p>
            <span className="font-semibold">Institution Number:</span>{" "}
            {institutionData.institutionNumber}
          </p>
          <p>
            <span className="font-semibold">Institution Name:</span>{" "}
            {institutionData.institutionName}
          </p>
          <p className="mt-4">
            <span className="font-semibold text-black">Duty Dates:</span>
          </p>
          {Object.entries(institutionData.dates)
            .filter(([date, value]) => date !== "_id" && value !== "") // Exclude Date _id and empty values
            .map(([date, value]) => (
              <p key={date}>
                <span className="font-semibold">Date {date}:</span> {value}
              </p>
            ))}
        </div>
      )}

      {error && <p className="text-red-500 mt-8">Error: {error}</p>}
    </div>
  );
}

export default InstitutionData;
