// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return <div className={`px-6 py-4 border-b border-slate-200 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}
