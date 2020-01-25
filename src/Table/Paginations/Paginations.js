import React from "react";

const Paginations = function(props) {
  return (
    <div className="d-flex justify-content-end">
      <ul className="pagination">
        <button className="btn btn-link  disabled ">
          {props.currentPage} / {props.totalPages}
        </button>
        <div className="btn-group" role="group">
          <button
            className="btn page-link"
            disabled={props.currentPage === 1}
            onClick={() => props.onPageChange(-1)}
          >
            Previous
          </button>
          <button
            className="btn page-link"
            disabled={props.totalPages === props.currentPage}
            onClick={() => props.onPageChange(1)}
          >
            Next
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Paginations;
