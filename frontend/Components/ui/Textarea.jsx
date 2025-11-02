// src/components/ui/textarea.jsx
import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${className}`}
      {...props}
    />
  );
}
