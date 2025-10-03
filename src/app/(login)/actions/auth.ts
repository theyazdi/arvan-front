"use server";
import { API_BASE_URL } from "@/lib/fetch";
import { cookies } from "next/headers";
import { getCsrfToken } from "@/lib/csrf";

const Login = async (data: { email: string; password: string }) => {
  try {
    // Get CSRF token
    const csrfToken = await getCsrfToken();

    const response = await fetch(`${API_BASE_URL}/user/log-in/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "X-CSRFTOKEN": csrfToken,
      },
      credentials: "include",
    });

    if (!response.ok) {
      let errorMessage = "خطا در ورود";
      try {
        const errorResult = await response.json();
        errorMessage = errorResult.detail || errorResult.message || errorMessage;
      } catch {
        errorMessage = `خطا ${response.status}: ${response.statusText}`;
      }
      return {
        success: false,
        message: errorMessage,
      };
    }

    const result = await response.json();
    const cookieStore = await cookies();
    
    // Store both access and refresh tokens
    if (result.access) {
      cookieStore.set("arvan_access", result.access, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 24 hours
        sameSite: "lax",
      });
    }
    
    if (result.refresh) {
      cookieStore.set("arvan_refresh", result.refresh, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax",
      });
    }
    
    return { success: true, message: "success login", data: result };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "No active account found with the given credentials",
    };
  }
};

export { Login };
