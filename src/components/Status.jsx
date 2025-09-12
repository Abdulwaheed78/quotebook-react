import React, { useEffect } from "react";

function Status({ type, message, onClose }) {
  const alertClass =
    type === "error" ? "alert alert-danger" : "alert alert-success";

  // Auto close after 3s
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose?.(); // clear status from parent
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`${alertClass} fade show`} role="alert">
      {message}
    </div>
  );
}

export default Status;
