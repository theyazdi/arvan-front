"use client";

import { getCsrfToken } from "@/lib/csrf";
import { createAuthenticatedHeaders } from "@/lib/authToken";

const API_BASE_URL = "https://api.arvantravels.com";

/**
 * Make an authenticated API request
 */
export const authenticatedFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  // Get CSRF token for POST/PUT/DELETE requests
  let csrfToken = "";
  if (options.method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method)) {
    try {
      csrfToken = await getCsrfToken();
    } catch (error) {
      console.warn("Could not get CSRF token:", error);
    }
  }

  // Create headers with authentication
  const headers = createAuthenticatedHeaders({
    ...(csrfToken && { 'X-CSRFTOKEN': csrfToken }),
    ...options.headers,
  });

  // Make the request
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  return response;
};

/**
 * Make a POST request with authentication
 */
export const authenticatedPost = async (endpoint: string, data: any) => {
  const response = await authenticatedFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  return response;
};

/**
 * Make a GET request with authentication
 */
export const authenticatedGet = async (endpoint: string) => {
  const response = await authenticatedFetch(endpoint, {
    method: 'GET',
  });
  
  return response;
};
