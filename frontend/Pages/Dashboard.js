// src/pages/Dashboard.js
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReportCard from "../components/reports/ReportCard";
import ReportFilters from "../Components/reports/ReportFilters";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { listReports } from "@/api/reportApi"; // ✅ Use listReports from the corrected API

export default function Dashboard() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: null,
    urgency: null,
    city: null,
    search: "",
    sort: "-created_date" // Default sort order
  });

  // --- FIX: Pass filters directly to the API (Backend handles filtering) ---
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports", filters], // Query refetches whenever filters change
    queryFn: () => listReports(filters), // Pass the filters object to the API
  });

  const displayedReports = reports;

  const handleReportClick = (report) => {
    navigate(createPageUrl(`ReportDetail?id=${report.id}`));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Inspector Dashboard</h1>
            <p className="text-slate-600 mt-1">
              Manage and review accessibility reports
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FileText className="w-4 h-4" />
            <span className="font-medium">{displayedReports.length}</span> reports shown
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-slate-600" />
            <h2 className="font-semibold text-slate-900">Filters</h2>
          </div>
          <ReportFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Reports Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedReports.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No reports found</h3>
            <p className="text-slate-600">
              {filters.status || filters.urgency || filters.city || filters.search
                ? "Try adjusting your filters"
                : "Reports will appear here once submitted"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={handleReportClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}