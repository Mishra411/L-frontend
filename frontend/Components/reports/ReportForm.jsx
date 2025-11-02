import React, { useState } from "react";

export default function ReportForm({ onSuccess, submitReport }) {
  const [formData, setFormData] = useState({
    station_name: "",
    station_city: "Edmonton",
    issue_category: "Slippery Surface",
    description: "",
    urgency_level: "Medium",
    reporter_contact: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReport(formData);
      onSuccess();
      setFormData({ ...formData, description: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit report");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <input
        name="station_name"
        value={formData.station_name}
        onChange={handleChange}
        placeholder="Station Name"
        required
        className="w-full border p-2 rounded"
      />
      <select name="station_city" value={formData.station_city} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="Edmonton">Edmonton</option>
        <option value="Calgary">Calgary</option>
      </select>
      <select name="issue_category" value={formData.issue_category} onChange={handleChange} className="w-full border p-2 rounded">
        <option>Slippery Surface</option>
        <option>Blocked Access</option>
        <option>Broken Elevator</option>
        <option>Lighting Issue</option>
        <option>Vandalism</option>
        <option>Safety Concern</option>
        <option>Other</option>
      </select>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows={4}
        className="w-full border p-2 rounded"
        required
      />
      <select name="urgency_level" value={formData.urgency_level} onChange={handleChange} className="w-full border p-2 rounded">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>
      <input
        name="reporter_contact"
        value={formData.reporter_contact}
        onChange={handleChange}
        placeholder="Contact (optional)"
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700">
        Submit Report
      </button>
    </form>
  );
}
