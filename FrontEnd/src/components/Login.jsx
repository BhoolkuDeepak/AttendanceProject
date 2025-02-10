import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";

const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); // Delay for smooth entry

    // Check if the user details were saved in localStorage (without "Remember me")
    const savedUser = localStorage.getItem("rememberUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setName(user.Username);
      setPassword(user.Password);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:5105/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username: name, Password: password }),
    });

    const data = await response.json();

    if (data.token) {
      // Store JWT Token in localStorage
      localStorage.setItem("jwtToken", data.token);

      onLogin();
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgb(245,245,240)", // Background color remains the same
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          borderRadius: "8px", // Slightly rounded corners
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Softer shadow
          padding: "48px 49px",
          boxSizing: "border-box",
          width: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Roboto",
            fontSize: "24px",
            color: "#454b1b",  // Updated color to match AddMember
            marginBottom: "20px",
          }}
        >
          Login to Your Account
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              color: "#212529",
              fontSize: "15px",
              fontFamily: "Roboto",
              marginBottom: "8px",
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              height: "38px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
              padding: "8px 12px",
              boxSizing: "border-box",
              backgroundColor: "#f9f9f9",  // Light background color for input
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              color: "#212529",
              fontSize: "14px",
              fontFamily: "Roboto",
              marginBottom: "8px",
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              height: "38px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
              padding: "8px 12px",
              boxSizing: "border-box",
              backgroundColor: "#f9f9f9",  // Light background color for input
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            height: "38px",
            backgroundColor: "#454b1b",  // Updated button color to match AddMember
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Sign in
        </button>

        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </div>
  );
};

export default LoginPage;
