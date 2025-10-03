"use client";

import { getCsrfToken } from "@/lib/csrf";

interface SendOTPResponse {
  success: boolean;
  message: string;
  data?: {
    sessionId: string;
    expiresIn?: number;
  };
}

interface VerifyOTPResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    refreshToken: string;
    user: {
      id: string;
      phoneNumber: string;
    };
  };
}

export async function sendOTP(phoneNumber: string): Promise<SendOTPResponse> {
  try {
    console.log("Sending OTP to:", phoneNumber);
    
    // Get CSRF token from cookies
    const csrfToken = await getCsrfToken();
    
    const response = await fetch('https://api.arvantravels.com/user/otp/request/', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': csrfToken,
      },
      body: JSON.stringify({
        phone_number: phoneNumber
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: "کد تایید ارسال شد",
        data: {
          sessionId: `otp-${Date.now()}-${phoneNumber}`, // Generate session ID for tracking
          expiresIn: data.expires_in_seconds || 120
        }
      };
    } else {
      return {
        success: false,
        message: data.message || "خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید."
      };
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      message: "خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید."
    };
  }
}

export async function verifyOTP(
  phoneNumber: string, 
  otpCode: string, 
  sessionId: string
): Promise<VerifyOTPResponse> {
  try {
    // Get CSRF token
    const csrfToken = await getCsrfToken();
    
    const response = await fetch('https://api.arvantravels.com/user/otp/verify/', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': csrfToken,
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        code: otpCode
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || "ورود موفقیت‌آمیز",
        data: {
          token: data.access,
          refreshToken: data.refresh,
          user: {
            id: data.user?.id || `user-${Date.now()}`,
            phoneNumber: phoneNumber
          }
        }
      };
    } else {
      return {
        success: false,
        message: data.message || data.detail || "کد تایید اشتباه است"
      };
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      message: "خطا در تایید کد. لطفاً دوباره تلاش کنید."
    };
  }
}

