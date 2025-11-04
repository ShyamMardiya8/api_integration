import React, { useContext, useEffect, useState } from "react";
import { userService } from "../services/userService";
import { responseHandler } from "../utility/helpers";
import { handleApiResponse } from "../utility/ApiResponse";
import { userAuth } from "../features/AuthContext";
import Search from "./Search";
import Pagination from "./Pagination";
import { Delete, DeleteIcon, Trash2 } from "lucide-react";

const Table = () => {
  const [cellValue, setCellValue] = useState({
    rowIndex: null,
    fieldName: null,
    value: "",
  });

  const [userData, setUserData] = useState([]);
  const [bodyValue, setBodyValue] = useState({});
  const { updateUserDetails, deleteUserDetails } = userAuth();
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    try {
      const response = await userService.getUserDetails();
      console.info("🚀 ~ fetchData ~ response:", response);
      setUserData(response.data);
      setTotalPages(response.totalDocuments);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (idx, fieldName, value, item) => {
    setCellValue({ rowIndex: idx, fieldName, value });
  };

  const handleChange = (e) => {
    setCellValue({ ...cellValue, value: e.target.value });
  };

  const handleBlur = (field, id) => {
    // debugger;
    const updated = [...userData];
    updated[cellValue.rowIndex][cellValue.fieldName] = cellValue.value;
    setBodyValue({});
    setUserData(updated);
    setCellValue({ rowIndex: null, fieldName: null, value: "" });
    const body = {
      _id: updated[cellValue.rowIndex]?._id,
      data: updated[cellValue.rowIndex],
    };
    return body;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const bodyValue = handleBlur();
      handleUpdate(bodyValue);
    }
  };
  const handleUpdate = async (body) => {
    if (!body?._id) return;
    const response = await updateUserDetails(body?._id, body?.data);
    alert(response.message);
  };

  const handleDelete = async (id) => {
    console.log("clicked delete button");
    if (!id) return;
    const response = await deleteUserDetails(id);
    alert(response?.message);
    fetchData();
  };
  return (
    <>
      <div className="p-4">
        <Search optionsData={["name", "age", "email"]} userData={setUserData} />
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">age</th>
              <th className="p-2 border">email</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, idx) => (
              <tr key={idx}>
                {["name", "age", "email"].map((field) => (
                  <td
                    key={field}
                    className="p-2 border cursor-pointer"
                    onClick={() => handleEdit(idx, field, item[field], item)}
                  >
                    {cellValue.rowIndex === idx &&
                    cellValue.fieldName === field ? (
                      <input
                        id="table-data"
                        type="text"
                        value={cellValue.value}
                        onChange={handleChange}
                        onBlur={() => handleBlur(item, item._id)}
                        onKeyDown={handleKeyPress}
                        autoFocus
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      item[field]
                    )}
                  </td>
                ))}
                <td className="p-2 border cursor-pointer">
                  <Trash2 onClick={() => handleDelete(item._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination userData={setUserData} totalPages={totalPages} />
    </>
  );
};

export default Table;
