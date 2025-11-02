import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Tailwind CSS
import "./index.css";

// Pages
import Dashboard from "./Pages/Dashboard.jsx";
import Home from "./Pages/Home.jsx";
import Analytics from "./Pages/Analytics.jsx";
import ReportDetails from "./Pages/ReportDetails.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/report/:id" element={<ReportDetails />} />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
