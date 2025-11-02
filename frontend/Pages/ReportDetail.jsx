// src/pages/ReportDetail.jsx
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { Button } from "../Components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card.jsx";
import { Textarea } from "../Components/ui/textarea.jsx";
import { Label } from "../Components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/select.jsx";

import { StatusBadge, UrgencyBadge } from "../Components/reports/StatusBadge.jsx";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Save,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

import { Skeleton } from "../Components/ui/skeleton.jsx";
import { getReport, updateReport } from "../api/reportApi.js";

// Dynamic API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function ReportDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const urlParams = new URLSearchParams(window.location.search);
  const reportId = urlParams.get("id");

  const [inspectorNotes, setInspectorNotes] = useState("");
  const [status, setStatus] = useState("");

  const { data: report, isLoading, isError } = useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getReport(reportId),
    enabled: !!reportId,
  });

  useEffect(() => {
    if (report) {
      setInspectorNotes(report.inspector_notes || "");
      setStatus(report.status);
    }
  }, [report]);

  const updateMutation = useMutation({
    mutationFn: (payload) => updateReport(reportId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["report", reportId]);
      queryClient.invalidateQueries(["reports"]);
    },
  });

  const fullPhotoUrl = report?.photo_url ? `${API_BASE_URL}${report.photo_url}` : null;
  const googleMapEmbedUrl =
    report?.latitude && report?.longitude
      ? `https://maps.google.com/maps?q=${report.latitude},${report.longitude}&z=16&output=embed`
      : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 animate-pulse">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-48 mb-4 rounded-lg" />
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Report not found</h2>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const {
    issue_category,
    station_name,
    station_city,
    description,
    created_date,
    created_by,
    reporter_contact,
    urgency_level,
  } = report;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="flex items-center mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Report Details */}
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
              <CardTitle>Report Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 text-xl mb-2">{issue_category}</h3>
                <div className="flex items-center gap-2 text-slate-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{station_name}, {station_city}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <StatusBadge status={status} />
                <UrgencyBadge urgency={urgency_level} />
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-medium text-slate-900 mb-2">Description</h4>
                <p className="text-slate-700 leading-relaxed">{description}</p>
              </div>

              {fullPhotoUrl && (
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Attached Photo
                  </h4>
                  <a
                    href={fullPhotoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow"
                  >
                    <img src={fullPhotoUrl} alt="Issue" className="w-full h-auto object-cover" />
                  </a>
                </div>
              )}

              {googleMapEmbedUrl && (
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location Preview
                  </h4>
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-slate-200">
                    <iframe
                      title="report-location"
                      width="100%"
                      height="100%"
                      loading="lazy"
                      allowFullScreen
                      src={googleMapEmbedUrl}
                      className="border-0"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Reported: {format(new Date(created_date), "MMMM d, yyyy 'at' h:mm a")}</span>
                </div>
                {created_by && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>By: {created_by}</span>
                  </div>
                )}
                {reporter_contact && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Contact: {reporter_contact}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Inspector Actions */}
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-slate-800 text-white">
              <CardTitle>Inspector Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label htmlFor="status">Update Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Submitted", "Under Review", "In Progress", "Resolved", "Closed"].map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Inspector Notes</Label>
                <Textarea
                  id="notes"
                  value={inspectorNotes}
                  onChange={(e) => setInspectorNotes(e.target.value)}
                  placeholder="Add notes about actions taken, timeline, or additional context..."
                  rows={8}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={() => updateMutation.mutate({ status, inspector_notes: inspectorNotes })}
                disabled={updateMutation.isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-2"
              >
                {updateMutation.isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Changes
                  </>
                )}
              </Button>

              {updateMutation.isSuccess && (
                <div className="text-center text-sm text-green-600 font-medium">
                  Changes saved successfully!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
