import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "@/reportApi.js";
import { getStats } from "@/reportApi.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card.jsx";
import { Skeleton } from "@/Components/ui/skeleton.jsx";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { FileText, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

const COLORS = ['#f97316', '#ef4444', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

export default function Analytics() {
  const { data: stats, isLoading, isError } = useQuery(['stats'], getStats);

  if (isLoading) return <Skeleton className="h-10 w-full" />;
  if (isError || !stats) return <div className="text-center p-10">Error loading analytics data.</div>;

  const categoryData = Object.entries(stats.by_category || {}).map(([name, value]) => ({ name, value }));
  const urgencyData = Object.entries(stats.by_urgency || {}).map(([name, value]) => ({ name, value }));
  const cityData = Object.entries(stats.by_city || {}).map(([name, value]) => ({ name, value }));
  const topStations = (stats.top_stations || []).map(item => ({ name: item.station, value: item.count }));

  const totalReports = stats.total || 0;
  const resolvedCount = stats.by_status?.['Resolved'] || 0;
  const pendingCount = (stats.by_status?.['Submitted'] || 0) + (stats.by_status?.['Under Review'] || 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Analytics & Insights</h1>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3 flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="w-5 h-5 text-orange-600" />
            </CardHeader>
            <CardContent><div className="text-3xl font-bold">{totalReports}</div></CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3 flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </CardHeader>
            <CardContent>{stats.by_urgency?.['Critical'] || 0}</CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3 flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>{resolvedCount}</CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3 flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="w-5 h-5 text-yellow-600" />
            </CardHeader>
            <CardContent>{pendingCount}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
