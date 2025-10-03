import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/fetch";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // First, get CSRF token
    const csrfResponse = await fetch(`${API_BASE_URL}/user/csrf/`, {
      method: "GET",
      credentials: "include",
    });
    
    let csrfToken = "";
    if (csrfResponse.ok) {
      const csrfData = await csrfResponse.json();
      csrfToken = csrfData.csrfToken || "";
    }
    
    const response = await fetch(`${API_BASE_URL}/user/log-in/`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "X-CSRFTOKEN": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      data: data,
      headers: Object.fromEntries(response.headers.entries()),
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
