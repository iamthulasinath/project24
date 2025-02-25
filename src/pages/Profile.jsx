import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Navbar } from "../components/Navbar";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <h1>Profile</h1>

          <div className="profile-info">
            <div className="info-group">
              <label>Name</label>
              <p>{user.name}</p>
            </div>

            <div className="info-group">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
