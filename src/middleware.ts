import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("arvan_access")?.value;

  // Handle payment callback POST requests
  if (request.method === "POST" && request.nextUrl.pathname === "/paymentresult") {
    const targetUrl = new URL(request.url);
    targetUrl.pathname = "/paymentresult/api/callback";
    return NextResponse.rewrite(targetUrl);
  }

  // If user has token and tries to access login page, redirect to dashboard
  if (token) {
    if (request.nextUrl.pathname === "/login") {
      const targetUrl = new URL(request.url);
      targetUrl.pathname = "/dashboard";
      return NextResponse.redirect(targetUrl);
    }
  }
  // Note: We're not redirecting to login for dashboard access
  // Let the client-side AuthProvider handle localStorage-based authentication

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/dashboard/:path*", "/paymentresult"],
};
