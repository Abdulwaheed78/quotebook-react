import React from "react";

export default function ShareButton({ quote }) {
  const shareUrl = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(quote.quote);

  return (
    <>
      <a
        href={`https://api.whatsapp.com/send?text=${text}%20${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
      >
        <i className="bi bi-whatsapp fs-4 text-success"></i>
      </a>
    </>
  );
}
