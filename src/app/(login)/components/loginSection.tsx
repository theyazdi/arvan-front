import React, { useState } from "react";
import { FormLogin } from "@/app/(login)";
import { MobileLoginForm } from "./mobileLoginForm";
import { OTPVerification } from "./otpVerification";
import { SocialLoginButtons } from "@/app/(login)";

type LoginMode = "email" | "mobile" | "otp";

function LoginSection() {
  const [loginMode, setLoginMode] = useState<LoginMode>("email");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [expiresIn, setExpiresIn] = useState(120);

  const handleMobileLogin = () => {
    setLoginMode("mobile");
  };

  const handleBackToEmail = () => {
    setLoginMode("email");
  };

  const handleOTPSent = (phone: string, session: string, expires?: number) => {
    setPhoneNumber(phone);
    setSessionId(session);
    setExpiresIn(expires || 120);
    setLoginMode("otp");
  };

  const handleResendOTP = () => {
    // Reset to mobile form to resend OTP
    setLoginMode("mobile");
  };

  return (
    <div className="flex flex-col w-full">
      {/* <SocialLoginButtons /> */}
      
      <div>
        {loginMode === "email" && (
          <FormLogin onMobileLogin={handleMobileLogin} />
        )}
        {loginMode === "mobile" && (
          <MobileLoginForm 
            onOTPSent={handleOTPSent}
            onBack={handleBackToEmail}
          />
        )}
        {loginMode === "otp" && (
          <OTPVerification 
            phoneNumber={phoneNumber}
            sessionId={sessionId}
            expiresIn={expiresIn}
            onBack={handleBackToEmail}
            onResend={handleResendOTP}
          />
        )}
      </div>
    </div>
  );
}

export { LoginSection };
