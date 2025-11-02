import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // Your main App component
import "./index.css";          // Optional, can create an empty CSS file if needed

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
