import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllReports } from "@/reportApi";

import ReportForm from "@/Components/reports/ReportForm";
import ReportFilters from "@/Components/reports/ReportFilters";
import ReportCard from "@/Components/reports/ReportCard";
import ReportDetail from "@Ccomponents/reports/ReportDetail";

import { LayoutGrid, AlertCircle, Loader2 } from "lucide-react";

export default function Dashboard() {
  const [filters, setFilters] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);

  const { data: reports, isLoading, isError, refetch } = useQuery(
    ["reports", filters],
    () => getAllReports(filters)
  );

  const handleReportSuccess = () => refetch();
  const handleCardClick = (report) => setSelectedReport(report);

  const displayedReports = reports || [];

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inspector Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage and review accessibility reports</p>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <LayoutGrid className="w-4 h-4" />
          <span>Reports View</span>
        </div>
      </div>

      <hr className="my-6 border-slate-200" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ReportForm onSuccess={handleReportSuccess} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ReportFilters filters={filters} onFilterChange={setFilters} />

          <div className="space-y-4">
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 mr-2 animate-spin text-orange-500" />
                <span className="text-lg text-slate-600">Loading reports...</span>
              </div>
            )}

            {isError && (
              <div className="flex justify-center items-center py-12 text-red-600">
                <AlertCircle className="w-6 h-6 mr-2" />
                <span className="text-lg">Error loading reports.</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedReports.map((report) => (
                <ReportCard
                  key={report.report_id || report.id}
                  report={report}
                  onClick={handleCardClick}
                />
              ))}
            </div>

            {selectedReport && (
              <ReportDetail
                report={selectedReport}
                onClose={() => setSelectedReport(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
