import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import Status from "./Status";

function Signup({ setToken }) {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/signup", data);

      // Save token
      localStorage.setItem("quoteApiToken", res.data.access_token);
      setToken(res.data.access_token); // update App state
      // Show success message
      setStatus({
        type: "success",
        message: res.data.message || "Signup successful",
      });

      // Redirect (optional: add a small delay if you want user to see the message)
      navigate("/");
    } catch (err) {
      // console.error(err.response?.data || err.message);

      // Show error message
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5">
      <div className="col-12 col-md-6 col-lg-3">
        <div
          className="card p-4 bg-transparent"
          style={{ border: "1px solid black" }}
        >
          <h2 className="text-center text-dark mb-4">Signup</h2>

          {/* show status message if exists */}
          {status.message && (
            <Status
              type={status.type}
              message={status.message}
              onClose={() => setStatus({ type: "", message: "" })}
            />
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                id="name"
                onChange={onChange}
                className="form-control rounded-3"
                style={{ border: "1px solid black" }}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                id="email"
                onChange={onChange}
                className="form-control rounded-3"
                style={{ border: "1px solid black" }}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                id="password"
                onChange={onChange}
                className="form-control rounded-3"
                style={{ border: "1px solid black" }}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-3">
              Signup
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <NavLink to="/login" className="text-success fw-semibold">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
