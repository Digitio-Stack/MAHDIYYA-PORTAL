import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

function AllBranches() {
  const [branches, setBranches] = useState([]);
  const { pathname } = useLocation();

  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get(`/branch?sort=branchCode`);
      setBranches(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBranch = async (branchId) => {
    if(window.confirm("Are you sure to delete this item")){

      try {
        let response = await Axios.delete(`/branch/${branchId}`);
        if (response.status === 200) {
          toast.success("Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000,
          });
          getAllBranches();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAllBranches();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="">
        {branches.length > 0 ? (
          <>
            <table className="max-w-xl ">
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
                    Study Centre
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
                  >
                    District
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
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-900 px-6 py-4 text-left"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch, i) => (
                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                      {i + 1}
                    </td>
                    <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                      {branch.branchName}
                    </td>
                    <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                      {branch.branchCode}
                    </td>
                    <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                      {branch.place}
                    </td>
                    <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                      {branch.district}
                    </td>
                    <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                      {branch.phone}
                    </td>
                    <td className="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                      <Link to={`/edit-branch/${branch._id}`}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                    </td>
                    <td className="text-sm text-red-700 font-light px-6 py-4 whitespace-nowrap">
                      <button onClick={() => deleteBranch(branch._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default AllBranches;
