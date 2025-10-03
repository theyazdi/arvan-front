"use client";

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    access: string;
    refresh: string;
  };
}

export const directLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    // Make login request directly
    const response = await fetch("https://api.arvantravels.com/user/log-in/", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.detail || "Login failed",
      };
    }

    const data = await response.json();
    
    // Store tokens in cookies
    if (data.access) {
      document.cookie = `arvan_access=${data.access}; path=/; max-age=${60 * 60 * 24}; secure; samesite=lax`;
    }
    
    if (data.refresh) {
      document.cookie = `arvan_refresh=${data.refresh}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=lax`;
    }

    return {
      success: true,
      message: "Login successful",
      data: {
        access: data.access,
        refresh: data.refresh,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Network error occurred",
    };
  }
};

export const logout = () => {
  // Clear tokens from cookies
  document.cookie = "arvan_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "arvan_refresh=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  
  // Redirect to login
  window.location.href = "/login";
};
