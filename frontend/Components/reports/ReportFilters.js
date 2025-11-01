// frontend/Components/reports/ReportFilters.js

import React from "react"; // Removed useEffect, useState
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
// Removed: import { fetchFilterOptions } from "@/api/reportApi"; 

// Hardcoded lists for stability in the absence of a dynamic endpoint
const CITIES = ["Edmonton", "Calgary"];
const STATUSES = ["Submitted", "Under Review", "In Progress", "Resolved", "Closed"];
const URGENCIES = ["Critical", "High", "Medium", "Low"];

export default function ReportFilters({ filters, onFilterChange }) {
  // --- FIX: Removed dynamic state/useEffect to simplify and ensure stability ---
  // const [cities, setCities] = useState(["Edmonton", "Calgary"]);
  // const [statuses, setStatuses] = useState(["Submitted", "Under Review", "In Progress", "Resolved", "Closed"]);
  // const [urgencies, setUrgencies] = useState(["Critical", "High", "Medium", "Low"]);

  // Note: If you implement a dynamic filter endpoint later, you should restore the useEffect logic.

  return (
    <div className="flex flex-wrap gap-3">
      {/* Search Input */}
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search stations or descriptions..."
            value={filters.search || ""}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pl-9"
          />
        </div>
      </div>

      {/* Status Filter */}
      <Select
        value={filters.status || "all"}
        onValueChange={(value) => onFilterChange({ ...filters, status: value === "all" ? null : value })}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {STATUSES.map((status) => (
            <SelectItem key={status} value={status}>{status}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Urgency Filter */}
      <Select
        value={filters.urgency || "all"}
        onValueChange={(value) => onFilterChange({ ...filters, urgency: value === "all" ? null : value })}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Urgency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Urgency</SelectItem>
          {URGENCIES.map((urgency) => (
            <SelectItem key={urgency} value={urgency}>{urgency}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* City Filter */}
      <Select
        value={filters.city || "all"}
        onValueChange={(value) => onFilterChange({ ...filters, city: value === "all" ? null : value })}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>
          {CITIES.map((city) => (
            <SelectItem key={city} value={city}>{city}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}