// src/components/ui/skeleton.jsx
import React from "react";

export function Skeleton({ className = "" }) {
  return <div className={`bg-slate-200 animate-pulse rounded ${className}`}></div>;
}
