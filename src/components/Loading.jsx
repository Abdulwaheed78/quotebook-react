import React from "react";
import "./styles/Loading.css"; // custom CSS for blinking, optional

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "100px", marginBottom: "100px" }}
    >
      <div className="text-center loading-container">
        {/* Logo */}
        <img
          src="./src/assets/quotebook.svg"
          alt="Logo"
          className="logo mb-3"
          style={{ width: "150px", height: "auto" }}
        />
        <br />
        {/* Spinner */}
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        {/* Blink text */}
        <p className="fw-bold text-success blink-text">
          <i className="bi bi-lightning-charge-fill"></i> Loading, please
          wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
