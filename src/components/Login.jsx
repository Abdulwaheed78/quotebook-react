import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Status from "./Status";

function Login( {setToken}) {
  const [data, setData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "", time: null });
  const navigate = useNavigate();

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", data);

      // Show success message
      setStatus({
        type: "success",
        message: res.data.message || "Login successful",
      });

      // Save token if returned
      if (res.data.access_token) {
        localStorage.setItem("quoteApiToken", res.data.access_token);
        setToken(res.data.access_token); // update App state
      }

      // Redirect after short delay to see message
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err.response?.data || err.message);

      // Show error message
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5">
      <div className="col-12 col-md-4 col-lg-3">
        <div
          className="card p-4 bg-transparent"
          style={{ border: "1px solid black" }}
        >
          <h2 className="text-center text-dark mb-4">Login</h2>

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
                type="email"
                name="email"
                className="form-control rounded-3"
                style={{ border: "1px solid black" }}
                placeholder="Email"
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control rounded-3"
                style={{ border: "1px solid black" }}
                placeholder="Password"
                onChange={onChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-3">
              Login
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="text-success fw-semibold">
              Signup
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
