import React, { useState, useEffect } from "react";
import Axios from "../../Axios";

function TrashDocuments() {
  const [documents, setDocuments] = useState([]);
  const [expandedDocumentId, setExpandedDocumentId] = useState(null);
  const [selectedDocumentData, setSelectedDocumentData] = useState(null);

  const restoreDocument = async (id) => {
    if (window.confirm("Do you want to restore this item")) {
      try {
        const response = await Axios.post(`/trash/${id}/restore`);
        window.location.reload();
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await Axios.get("/trash");
      setDocuments(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const toggleDocuments = (id, index) => {
    setExpandedDocumentId((prevId) => (prevId === id ? null : id));
    setSelectedDocumentData(documents[index]?.documents);
  };

  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-bold">Trash</h1>
      {documents.length < 1 && <h1 className="text-xl">Trash is empty now</h1>}

      <div className="grid gap-6 mt-6 mb-8 md:grid-cols-2 ">
        {documents.map((doc, index) => (
          <div
            key={doc._id}
            className={`p-6 bg-gray-200 rounded-lg shadow-sm cursor-pointer ${
              expandedDocumentId === doc._id
                ? "border-2 border-blue-500 bg-blue-100"
                : ""
            }`}
            onClick={() => toggleDocuments(doc._id, index)}
          >
            <h2 className="text-lg font-semibold">
              {doc._id} ({doc.documents.length})
            </h2>
          </div>
        ))}
      </div>

      {expandedDocumentId && (
        <div className="mt-4">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Restore </th>
                {/* <th className="px-4 py-2">Delete </th> */}
              </tr>
            </thead>
            <tbody>
              {selectedDocumentData.map((item, index) => {
                const fieldName = Object.keys(item.data)[1]; // Get the second field name dynamically

                return (
                  <tr key={index} className="bg-gray-200 w-full">
                    <td className="border px-4 py-2">
                      {item?.data[fieldName]}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => restoreDocument(item._id)}
                        className="text-green-600 font-semibold"
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TrashDocuments;
