"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  try {
    const cookieStore = await cookies();

    // Clear the access token cookie
    cookieStore.delete("arvan_access");

    // Redirect to login page
    redirect("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    // Even if there's an error, try to redirect to login
    redirect("/login");
  }
}
