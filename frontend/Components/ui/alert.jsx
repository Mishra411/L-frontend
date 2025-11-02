// src/components/ui/alert.jsx
import React from "react";

export function Alert({ children, className = "" }) {
  return (
    <div
      className={`p-4 rounded-lg border ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = "" }) {
  return <p className={`text-sm ${className}`}>{children}</p>;
}
