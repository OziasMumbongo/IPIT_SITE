// src/Component/EditProfile/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./EditProfile.css";

const EditProfile = ({ cart }) => {
  const navigate = useNavigate();

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Optional
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load from localStorage
    const storedUsername = localStorage.getItem("username") || "";
    const storedEmail = localStorage.getItem("userEmail") || "";

    setUsername(storedUsername);
    setEmail(storedEmail);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("userEmail", email);

    if (password) {
      localStorage.setItem("password", password); // only if you store password locally (not recommended for production)
    }

    alert("Profile updated successfully!");
    navigate("/homepage"); // Redirect to homepage after save
  };

  return (
    <>
      <NavBar
        cartCount={cart?.length || 0}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="edit-profile-page">
        <h1>Edit Profile</h1>

        <form className="edit-profile-form" onSubmit={handleSave}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password (optional)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />

          <button type="submit" className="btn-save-profile">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
