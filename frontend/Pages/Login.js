// src/pages/Login.js
import React, { useState } from "react";

// --- FIX: Use dynamic API_BASE_URL ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // --- FIX 1: Corrected admin endpoint path ---
    const endpoint = isAdmin ? "auth/admin/login" : "auth/login";
    
    let fetchOptions;
    
    if (isAdmin) {
      // --- FIX 2: Send Form Data for Admin Login (as required by backend) ---
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      fetchOptions = {
        method: "POST",
        // Note: Content-Type is handled automatically for URLSearchParams
        body: formData, 
      };
    } else {
      // Standard user login uses JSON
      fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      };
    }

    try {
      // Use dynamic API_BASE_URL
      const res = await fetch(`${API_BASE_URL}/${endpoint}`, fetchOptions);

      if (!res.ok) {
        const errorDetail = res.statusText || "Invalid credentials or Server Error";
        throw new Error(errorDetail);
      }

      const data = await res.json();
      onLogin(data, isAdmin);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />{" "}
          Login as Admin
        </label>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}