import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("arvan_access")?.value;

  // If user has token and tries to access login page, redirect to dashboard
  if (token) {
    if (request.nextUrl.pathname === "/login") {
      const targetUrl = new URL(request.url);
      targetUrl.pathname = "/dashboard";
      return NextResponse.redirect(targetUrl);
    }
  } else {
    // If user doesn't have token and tries to access protected routes, redirect to login
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      const targetUrl = new URL(request.url);
      targetUrl.pathname = "/login";
      return NextResponse.redirect(targetUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/dashboard/:path*"],
};
