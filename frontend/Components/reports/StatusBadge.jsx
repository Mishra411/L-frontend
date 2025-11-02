export function StatusBadge({ status }) {
  const colors = {
    Submitted: "bg-yellow-200 text-yellow-800",
    "Under Review": "bg-orange-200 text-orange-800",
    "In Progress": "bg-blue-200 text-blue-800",
    Resolved: "bg-green-200 text-green-800",
    Closed: "bg-gray-200 text-gray-800",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${colors[status] || "bg-gray-200"}`}>
      {status}
    </span>
  );
}

export function UrgencyBadge({ urgency }) {
  const colors = {
    Low: "bg-green-200 text-green-800",
    Medium: "bg-yellow-200 text-yellow-800",
    High: "bg-orange-200 text-orange-800",
    Critical: "bg-red-200 text-red-800",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${colors[urgency] || "bg-gray-200"}`}>
      {urgency}
    </span>
  );
}
