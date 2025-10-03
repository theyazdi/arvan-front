"use client";

import { useAuth } from "@/app/(auth)";
import { useRouter } from "next/navigation";

export function useLogout() {
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();

  const logout = async () => {
    try {
      // Clear auth state
      setIsLoggedIn(false);

      // Clear cookie by setting it to expire in the past
      document.cookie =
        "arvan_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, try to redirect
      router.push("/login");
    }
  };

  return logout;
}
