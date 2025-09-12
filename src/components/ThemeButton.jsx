import React from "react";
import { useEffect, useState } from "react";

function ThemeButton() {
  const [darkMode, setDarkMode] = useState(false);
  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Save theme in localStorage whenever it changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button  onClick={() => setDarkMode(!darkMode)} className="theme-button me-2">
      {darkMode ? "☀️ Light" : "🌙 Dark"} 
    </button>
  );
}

export default ThemeButton;
