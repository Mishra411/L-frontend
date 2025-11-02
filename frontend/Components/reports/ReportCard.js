import React from "react";
import { StatusBadge, UrgencyBadge } from "@/components/StatusBadge";

export default function ReportCard({ report, onClick }) {
  return (
    <div
      onClick={() => onClick(report)}
      className="border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-lg cursor-pointer transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-slate-900">{report.issue_category}</h3>
        <UrgencyBadge urgency={report.urgency_level} />
      </div>
      <p className="text-sm text-slate-600 mb-2">{report.description}</p>
      <StatusBadge status={report.status} />
    </div>
  );
}
