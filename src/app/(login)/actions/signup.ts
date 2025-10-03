"use server";
import { API_BASE_URL } from "@/lib";
import { cookies } from "next/headers";
interface SignupData {
  email: string;
  name: string;
  phone_number: string;
  password: string;
  password2: string;
}

export async function signupAction(data: SignupData) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/sign-up/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    const cookieStore = await cookies();
    if (responseData.access) {
      cookieStore.set("arvan_access", responseData.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    return { success: true, data: responseData };
  } catch (error) {
    console.error("Error during signup:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
