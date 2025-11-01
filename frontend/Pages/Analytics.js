// src/pages/Analytics.js
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FileText, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getStats } from "@/api/reportApi"; // ✅ Use the dedicated getStats API

const COLORS = ['#f97316', '#ef4444', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

export default function Analytics() {
  // --- FIX 1: Fetch aggregated stats directly from the backend ---
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats, // Calls the /reports/stats endpoint
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (isError || !stats) {
     return <div className="text-center p-10">Error loading analytics data.</div>
  }

  // --- FIX 2: Use the pre-calculated data structure from the API ---
  const categoryData = Object.entries(stats.by_category)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const urgencyData = Object.entries(stats.by_urgency)
    .map(([name, value]) => ({ name, value }));
    
  const cityData = Object.entries(stats.by_city)
    .map(([name, value]) => ({ name, value }));

  // top_stations is already pre-formatted by the backend
  const topStations = stats.top_stations.map(item => ({ 
    name: item.station, 
    value: item.count 
  }));
  
  const totalReports = stats.total;
  const resolvedCount = stats.by_status['Resolved'] || 0;
  const pendingCount = (stats.by_status['Submitted'] || 0) + (stats.by_status['Under Review'] || 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Analytics & Insights</h1>
          <p className="text-slate-600 mt-1">
            Track trends and patterns in accessibility reports
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Total Reports
                </CardTitle>
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {totalReports}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Critical Issues
                </CardTitle>
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {stats.by_urgency['Critical'] || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Resolved
                </CardTitle>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {resolvedCount}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Pending
                </CardTitle>
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {pendingCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts (uses new data structure) */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Issues by Category */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Issues by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Issues by Urgency */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Issues by Urgency Level</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={urgencyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {urgencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Reports by City */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Reports by City</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top 10 Stations */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Top Stations with Most Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topStations} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={150}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="border-none shadow-lg bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <CardTitle>Key Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-orange-50">
              <li>
                • Most common issue: <strong className="text-white">
                  {categoryData[0]?.name || 'N/A'}
                </strong> ({categoryData[0]?.value || 0} reports)
              </li>
              <li>
                • Station with most reports: <strong className="text-white">
                  {topStations[0]?.name || 'N/A'}
                </strong> ({topStations[0]?.value || 0} reports)
              </li>
              <li>
                • Resolution rate: <strong className="text-white">
                  {totalReports > 0 ? ((resolvedCount) / totalReports * 100).toFixed(1) : 0}%
                </strong>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}