"use server";
import { API_BASE_URL } from "@/lib/fetch";

export const testApiConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/log-in/`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@test.com",
        password: "test123",
      }),
    });

    return {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
