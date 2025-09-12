import React from "react";
import Navbar from "./components/Navbar";
import Quote from "./components/Quote";
import Quotes from "./components/Quotes";
import About from "./components/About";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Profile from "./components/Profile";

function App() {
  
  const [token, setToken] = useState(localStorage.getItem("quoteApiToken"));

  // Protected route: only accessible if logged in
  const ProtectedRoute = ({ children }) => {
    const storedToken = localStorage.getItem("quoteApiToken");
    return storedToken ? children : <Navigate to="/login" replace />;
  };

  // Guest route: only accessible if not logged in
  const GuestRoute = ({ children }) => {
    const storedToken = localStorage.getItem("quoteApiToken");
    return storedToken ? <Navigate to="/" replace /> : children;
  };
  return (
    <>
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Quote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <About />
          }
        />
        <Route
          path="/quotes"
          element={
            <ProtectedRoute>
              <Quotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login setToken={setToken} />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup setToken={setToken} />
            </GuestRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
