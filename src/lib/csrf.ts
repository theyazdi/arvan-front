"use server";
import { API_BASE_URL } from "@/lib/fetch";

export const getCsrfToken = async (): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/csrf/`, {
      method: "GET",
      credentials: "include",
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.csrfToken || "";
    }
    
    return "";
  } catch (error) {
    console.error("Error getting CSRF token:", error);
    return "";
  }
};
