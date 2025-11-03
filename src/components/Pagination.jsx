import React, { useState } from "react";
import { userAuth } from "../features/AuthContext";

const Pagination = ({
  totalPages = 10,
  initialPage = 1,
  initialPerPage = 10,
  userData,
  onPageChange = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const { groupPagination } = userAuth();

  const handlePageClick = async (page) => {
    console.log("clicked");
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page, perPage);
    const response = await groupPagination(page, 10);
    console.info("🚀 ~ handlePageClick ~ response:", response);
    userData(response.data);
    // console.info("🚀 ~ handlePageClick ~ page:", page);
  };

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPerPage(newPerPage);
    onPageChange(currentPage, newPerPage);
    console.info("🚀 ~ handlePerPageChange ~ currentPage:", currentPage);
  };

  const renderPageButtons = () => {
    const pages = [];

    // Always show first, last, and around current page
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <li key={i}>
            <button
              onClick={() => handlePageClick(i)}
              className={`pageBtn px-3 py-2 rounded-md text-sm font-medium border transition
                ${
                  i === currentPage
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "text-gray-700 bg-white border-gray-200 hover:bg-indigo-50 hover:text-indigo-700"
                }
              `}
            >
              {i}
            </button>
          </li>
        );
      } else if (
        (i === 2 && currentPage > 3) ||
        (i === totalPages - 1 && currentPage < totalPages - 2)
      ) {
        pages.push(
          <li
            key={`dots-${i}`}
            className="hidden sm:flex items-center px-2 text-gray-400"
          >
            …
          </li>
        );
      }
    }

    return pages;
  };

  return (
    <nav
      aria-label="Pagination"
      className="w-full max-w-lg flex justify-center flex-col mx-auto"
    >
      <ul className="flex items-center justify-center gap-2">
        <li>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border bg-white shadow-sm transition
              ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform -translate-x-px"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </button>
        </li>

        {renderPageButtons()}

        <li>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border bg-white shadow-sm transition
              ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform translate-x-px"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>
          Page <strong className="text-gray-800">{currentPage}</strong> of{" "}
          <span>{totalPages}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Per page</span>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="text-xs rounded-md border border-gray-200 bg-white px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
