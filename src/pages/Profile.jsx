import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Navbar } from "../components/Navbar";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
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
              <p>{state.user?.name}</p>
            </div>

            <div className="info-group">
              <label>Email</label>
              <p>{state.user?.email}</p>
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
