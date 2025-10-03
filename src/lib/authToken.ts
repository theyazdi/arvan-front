"use client";

/**
 * Get the current authentication token
 * Checks localStorage first, then falls back to cookies
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  // Check localStorage first (for mobile login)
  const localToken = localStorage.getItem('arvan_access');
  if (localToken) {
    return localToken;
  }
  
  // Fallback to cookies (for email login)
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'arvan_access') {
      return value;
    }
  }
  
  return null;
};

/**
 * Get authorization header for API requests
 */
export const getAuthorizationHeader = (): { Authorization?: string } => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Create headers object for authenticated API requests
 */
export const createAuthenticatedHeaders = (additionalHeaders: Record<string, string> = {}): Record<string, string> => {
  const authHeader = getAuthorizationHeader();
  return {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    ...authHeader,
    ...additionalHeaders,
  };
};
