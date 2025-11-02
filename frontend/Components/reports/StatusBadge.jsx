// src/components/reports/StatusBadge.jsx
import React from "react";

export const StatusBadge = ({ status }) => {
  const colors = {
    Submitted: "bg-gray-200 text-gray-800",
    "Under Review": "bg-yellow-200 text-yellow-800",
    "In Progress": "bg-blue-200 text-blue-800",
    Resolved: "bg-green-200 text-green-800",
    Closed: "bg-gray-400 text-gray-50",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${colors[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

export const UrgencyBadge = ({ urgency }) => {
  const colors = {
    Low: "bg-green-200 text-green-800",
    Medium: "bg-yellow-200 text-yellow-800",
    High: "bg-red-200 text-red-800",
    Critical: "bg-red-600 text-white",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${colors[urgency] || "bg-gray-100 text-gray-800"}`}>
      {urgency}
    </span>
  );
};
