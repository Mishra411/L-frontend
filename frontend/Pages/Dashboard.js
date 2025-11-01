import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllReports } from "@/api/reportApi"; // Assuming you have this API function

import ReportForm from "@/components/reports/ReportForm";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportCard from "@/components/reports/ReportCard";
import ReportDetail from "@/components/reports/ReportDetail"; // Assuming you have this component

import { LayoutGrid, AlertCircle, Loader2 } from "lucide-react";

export default function Dashboard() {
  const [filters, setFilters] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);

  const { data: reports, isLoading, isError, refetch } = useQuery({
    queryKey: ["reports", filters],
    queryFn: () => getAllReports(filters),
    onError: (error) => console.error("Failed to fetch reports:", error),
  });

  // Function to handle the successful submission of a new report
  const handleReportSuccess = () => {
    // Refetch the list of reports to show the new one
    refetch();
  };

  // Function to handle opening a report detail view
  const handleCardClick = (report) => {
    setSelectedReport(report);
  };

  // Function to filter reports on the client side (if needed, or rely solely on backend filtering via useQuery)
  const filterReports = (reportList) => {
    if (!reportList) return [];
    
    // Simple client-side filtering example if backend is not used for all filters
    return reportList.filter(report => {
        // More complex filtering logic can go here if the backend query is not comprehensive
        return true; 
    });
  };

  const displayedReports = filterReports(reports);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      
      {/* --- Dashboard Header (Fixed Syntax) --- */}
      <div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inspector Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Manage and review accessibility reports
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <LayoutGrid className="w-4 h-4" />
          <span>Reports View</span>
        </div>
      </div>
      
      {/* Horizontal Rule for separation */}
      <hr className="my-6 border-slate-200" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Report Form (For inspectors to quickly submit new issues) */}
        <div className="lg:col-span-1">
          <ReportForm onSuccess={handleReportSuccess} />
        </div>

        {/* Right Column: Report List and Details */}
        <div className="lg:col-span-2 space-y-6">
          <ReportFilters filters={filters} onFilterChange={setFilters} />

          {/* Report List Display */}
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
              {displayedReports && displayedReports.map((report) => (
                <ReportCard 
                  key={report.report_id} 
                  report={report} 
                  onClick={handleCardClick}
                />
              ))}
            </div>

            {/* Display Report Detail Modal or Side Panel */}
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
