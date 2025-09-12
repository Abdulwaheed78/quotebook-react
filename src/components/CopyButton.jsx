import React from "react";
import { useState } from "react";
function CopyButton({ quote, quoteId }) {
  const [isCopied, setIsCopied] = useState(null);
  function handleCopy(quote, key) {
    navigator.clipboard.writeText(quote).then(() => {
      setIsCopied(key);
      setTimeout(() => setIsCopied(null), 2000);
    });
  }

  return (
    <div className="text-end">
      <button
        onClick={() => handleCopy(quote, quoteId)}
        className="btn btn-sm btn-outline-success text-xsm"
      >
        {isCopied === quoteId ? "Copied !" : "Copy"}
      </button>
    </div>
  );
}

export default CopyButton;
