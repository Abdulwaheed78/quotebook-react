import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeButton from "./ThemeButton";

function Navbar({ token, setToken }) {
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("quoteApiToken");
    setToken(null); // update App state
    navigate("/login"); // redirect to login
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container d-flex justify-content-between align-items-center">
          {/* ✅ Logo always on the left (desktop) */}
          <NavLink className="navbar-brand" to="/">
            <img
              src="./src/assets/quotebook.svg"
              alt="Logo"
              className="mb-2"
              style={{ height: "30px" }}
            />
          </NavLink>

          {/* ✅ Center Menu (desktop only) */}
          <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={active ? "nav-link active" : "nav-link"}
                  to="/"
                >
                  Quote of the day
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={active ? "nav-link active" : "nav-link"}
                  to="/quotes"
                >
                  Quotes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={active ? "nav-link active" : "nav-link"}
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>
              {!token && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={active ? "nav-link active" : "nav-link"}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>{" "}
                  <li className="nav-item">
                    <NavLink
                      className={active ? "nav-link active" : "nav-link"}
                      to="/signup"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}

              {token && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      Profile
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <p
                      style={{ cursor: "pointer",marginLeft:'10px' }}
                      onClick={() => {
                        if (
                          window.confirm("Are you sure you want to logout?")
                        ) {
                          handleLogout();
                        }
                      }}
                      className=" mt-2 text-danger"
                    >
                      Logout <i className="bi bi-box-arrow-right"></i>
                    </p>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* ✅ Right Side Buttons */}
          <div className="d-flex align-items-center">
            {/* Theme Toggle FIRST in mobile */}
            <ThemeButton className="me-2" style={{ marginRight: "5px" }} />

            {/* Mobile: Offcanvas Toggle */}
            <button
              className="btn btn-outline-success d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#staticBackdrop"
              aria-controls="staticBackdrop"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Offcanvas for mobile */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header">
          {/* Logo inside offcanvas for mobile */}
          <img
            src="./src/assets/quotebook.svg"
            alt="Logo"
            className="mb-2"
            style={{ height: "30px" }}
          />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Quote of the day
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/quotes">
                Quotes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            {!token && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}

            {token && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <p
                    className="text-danger"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to logout?")) {
                        handleLogout();
                      }
                    }}
                  >
                    Logout <i className="bi bi-box-arrow-right"></i>
                  </p>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
