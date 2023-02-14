import React, { useState } from "react";

function Pagination(props) {
  const [currentPageNumber, setCurrentPageNumber] = useState(props.currentPage);
  const pageNumbers = [];
  const handlePageChange = (newPageNumber) => {
    setCurrentPageNumber(newPageNumber);
    props.onPageChange(newPageNumber);
  };
 for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
 }
 let totalPages =Math.ceil(props.totalItems / props.itemsPerPage);
  return (
    <div className="d-flex justify-content-center py-2">
      <nav className="d-block"></nav>
      <div>
        <nav
          className="position-relative "
          aria-label="Pagination"
        >
          <ul className="pagination">
            <li className="page-item">
              <button
                disabled={currentPageNumber === 1}
                onClick={() => handlePageChange(currentPageNumber - 1)}
                className="page-link"
              >
                <span>Previous</span>
              </button></li>
              {pageNumbers?.map((number) => (
                <li className="page-item" key={number}>
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={
                    currentPageNumber === number
                      ? "page-link active"
                      : " page-link "
                  }
                >
                  {number}
                </button></li>
              ))}
               <li className="page-item">
              <button
                disabled={currentPageNumber === totalPages}
                onClick={() => handlePageChange(currentPageNumber + 1)}
                aria-disabled={true}
                className="page-link"
              >
                <span>Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
