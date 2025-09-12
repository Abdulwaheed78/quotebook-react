import React, { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // handle scroll for desktop + mobile browsers
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (scrollTop > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="position-fixed"
        style={{
          bottom: "20px",
          right: "60px",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          border: "2px solid green",
          backgroundColor: "white",
          color: "green",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i className="bi bi-arrow-up" style={{ fontSize: "20px" }}></i>
      </button>
    )
  );
}
