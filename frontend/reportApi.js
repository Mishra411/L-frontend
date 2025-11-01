// src/api/reportApi.js

// 1. Base URL Definition: Uses Vite environment variable for production, 
//    falls back to localhost for development.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const handleResponse = async (res) => {
    if (!res.ok) {
        // Attempt to read the error from the response body if available
        const errorDetail = await res.text();
        throw new Error(`API Error: ${res.status} - ${errorDetail || res.statusText}`);
    }
    return res.json();
};

/**
 * Fetches reports, accepting all backend filter and sort parameters.
 * @param {Object} params - Query parameters (status, urgency, city, search, sort)
 */
export const listReports = async (params = {}) => {
    // 2. FIX: Use the correct variable: API_BASE_URL
    const url = new URL(`${API_BASE_URL}/reports`);
    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
            url.searchParams.append(key, params[key]);
        }
    });

    const res = await fetch(url.toString());
    return handleResponse(res);
};

/**
 * Fetches calculated statistics from the dedicated backend endpoint for Analytics.
 */
export const getStats = async () => {
    // 2. FIX: Use the correct variable: API_BASE_URL
    const res = await fetch(`${API_BASE_URL}/reports/stats`);
    return handleResponse(res);
};

/**
 * Fetches a single report by ID.
 */
export const getReport = async (id) => {
    // 2. FIX: Use the correct variable: API_BASE_URL
    const res = await fetch(`${API_BASE_URL}/reports/${id}`);
    return handleResponse(res);
};

/**
 * Updates a report's status and inspector notes (PATCH request).
 */
export const updateReport = async (id, data) => {
    // 2. FIX: Use the correct variable: API_BASE_URL
    const res = await fetch(`${API_BASE_URL}/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return handleResponse(res);
};

/**
 * Submits a new report, including file upload (multipart/form-data).
 * @param {FormData} formData - FormData object containing all report fields and file.
 */
export const submitReport = async (formData) => {
    // 2. FIX: Use the correct variable: API_BASE_URL
    const res = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        body: formData, // fetch will automatically set Content-Type: multipart/form-data
    });
    return handleResponse(res);
};

/**
 * Authenticates a regular user.
 */
export async function loginUser(username, password) {
    // 2. FIX: Use the correct variable: API_BASE_URL
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    return handleResponse(res); // Replaced inline check with reusable handleResponse
}

/**
 * Registers a new user.
 */
export async function registerUser(username, password, role="customer") {
    // 2. FIX: Use the correct variable: API_BASE_URL
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role })
    });
    return handleResponse(res); // Replaced inline check with reusable handleResponse
}

// ⚠️ Note: Admin login is typically handled separately in Login.js because it requires FormData,
// which is a difference in the request structure handled better outside this centralized JSON-based section.