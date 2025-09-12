// NoQuotes.jsx
import React from "react";

function NoQuotes({ message = "No quotes found" }) {
  return (
    <div className="text-center p-5">
      <div className="card bg-transparent p-4">
        <h5 className="text-muted">{message}</h5>
      </div>
    </div>
  );
}

export default NoQuotes;
