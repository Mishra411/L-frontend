// src/components/ui/button.jsx
import React from "react";

export function Button({ children, className = "", variant = "default", ...props }) {
  const base = "px-4 py-2 rounded-lg font-semibold focus:outline-none transition-colors flex items-center justify-center gap-2";
  const variants = {
    default: "bg-orange-600 hover:bg-orange-700 text-white",
    outline: "border border-slate-300 text-slate-900 bg-white hover:bg-slate-50",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
