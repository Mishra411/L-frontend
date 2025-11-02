import React from "react";

export default function ReportFilters({ filters, onFilterChange }) {
  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex gap-4 mb-4">
      <select name="station_city" value={filters.station_city || ""} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Cities</option>
        <option value="Edmonton">Edmonton</option>
        <option value="Calgary">Calgary</option>
      </select>
      <select name="status" value={filters.status || ""} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Statuses</option>
        <option value="Submitted">Submitted</option>
        <option value="Under Review">Under Review</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
