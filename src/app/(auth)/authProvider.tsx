"use client";
import { API_BASE_URL } from "@/lib";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  token?: string;
  refreshToken?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
  token?: string;
  refreshToken?: string;
}

export function AuthProvider({ children, token, refreshToken }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      // Check both server-side token and localStorage token
      const serverToken = token;
      const localToken = typeof window !== 'undefined' ? localStorage.getItem('arvan_access') : null;
      const currentToken = serverToken || localToken;
      
      if (!currentToken) return;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${API_BASE_URL}/user/token/verify/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: currentToken }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          // Clear invalid tokens
          if (typeof window !== 'undefined') {
            localStorage.removeItem('arvan_access');
            localStorage.removeItem('arvan_refresh');
          }
        }
      } catch (error) {
        setIsLoggedIn(false);
        // Clear invalid tokens on error
        if (typeof window !== 'undefined') {
          localStorage.removeItem('arvan_access');
          localStorage.removeItem('arvan_refresh');
        }
      }
    };

    getCurrentUser();
  }, [token]);

  // Get current token from localStorage if available
  const currentToken = token || (typeof window !== 'undefined' ? localStorage.getItem('arvan_access') : null);
  const currentRefreshToken = refreshToken || (typeof window !== 'undefined' ? localStorage.getItem('arvan_refresh') : null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token: currentToken, refreshToken: currentRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
