// src/pages/Login.jsx
import React, { useState } from "react";
import { Button } from "@/Components/ui/Button.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isAdmin ? "auth/admin/login" : "auth/login";
      const options = isAdmin
        ? {
            method: "POST",
            body: new URLSearchParams({ username, password }),
          }
        : {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          };

      const res = await fetch(`${API_BASE_URL}/${endpoint}`, options);

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Invalid credentials");
      }

      const data = await res.json();
      onLogin(data, isAdmin);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="h-4 w-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
            />
            <label className="text-sm text-slate-700">Login as Admin</label>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
