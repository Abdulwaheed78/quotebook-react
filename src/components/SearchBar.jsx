import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="d-flex justify-content-end">
      <div className="col-12 col-md-4 position-relative">
        <input
          type="text"
          name="search"
          className="form-control pe-5"
          placeholder="Search by quote or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ borderRadius: "15px",border:'1px solid black' }}
        />

        {searchTerm && (
          <button
            className="btn btn-sm btn-outline-danger position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center"
            style={{
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              padding: "0",
            }}
            onClick={() => setSearchTerm("")}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
