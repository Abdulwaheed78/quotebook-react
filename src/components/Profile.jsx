import React, { useEffect, useState } from "react";
import axios from "axios";
import Quotes from "./manage_quotes/Quotes";
import CreateEdit from "./manage_quotes/Create";
import LikedQuotes from "./manage_quotes/LikedQuotes";

export default function Profile() {
  const [user, setUser] = useState([]);
  const [componentToShow, setComponentToShow] = useState("all"); // null | "all" | "create" | "deleted" | "liked"

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("quoteApiToken"); // your stored API token
      const res = await axios.get("http://127.0.0.1:8000/api/user-detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log("Data coming is:", res.data.data); // log the actual response data
      setUser(res.data.data); // data comes from Laravel response ['data' => $user]
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Profile Card */}
        <div className="col-12 col-md-3">
          <div
            className="card bg-transparent position-sticky"
            style={{
              top: "20px", // stick from 20px below top
              border: "1px solid black",
            }}
          >
            <div className="card-body text-center">
              {/* Profile Image */}
              <img
                src={"../src/assets/static_user.png"} // adjust the path if needed
                alt="User"
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />

              {/* User Info */}
              <h3 className="card-title mb-2">{user.name}</h3>
              <p className="card-text text-muted">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Right Manage Quotes */}
        <div className="col-12 col-md-9 mt-4 mt-md-0">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Manage Quotes</h3>
            <div className="ms-auto">
              <select
                className="form-select"
                value={componentToShow}
                onChange={(e) => setComponentToShow(e.target.value)}
              >
                <option value="all">My Quotes</option>
                <option value="create">Create Quote</option>
                <option value="liked">Liked Quotes</option>
              </select>
            </div>
          </div>

          {/* Conditionally render components */}
          <div>
            {componentToShow === "all" && <Quotes />}
            {componentToShow === "create" && <CreateEdit />}
            {componentToShow === "liked" && <LikedQuotes />}
          </div>
        </div>
      </div>
    </div>
  );
}
