"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyOTP } from "../actions/mobileAuth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(auth)/authProvider";
import { useState, useEffect, useRef } from "react";

interface OTPVerificationProps {
  phoneNumber: string;
  sessionId: string;
  expiresIn?: number;
  onBack: () => void;
  onResend: () => void;
}

function OTPVerification({ phoneNumber, sessionId, expiresIn = 120, onBack, onResend }: OTPVerificationProps) {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(expiresIn);
  const [canResend, setCanResend] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move to next input if value is entered (left to right)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtpValues.every(val => val !== "") && newOtpValues.join("").length === 6) {
      handleSubmit(newOtpValues.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (otpValues[index]) {
        // If current field has value, clear it
        const newOtpValues = [...otpValues];
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
      } else if (index > 0) {
        // Move to previous field (left to right navigation)
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Handle arrow keys (left to right navigation)
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtpValues = Array(6).fill("");
    
    // Fill from left to right (index 0 to 5)
    for (let i = 0; i < pastedData.length; i++) {
      newOtpValues[i] = pastedData[i];
    }
    
    setOtpValues(newOtpValues);
    
    // Focus the next empty field or last field (left to right)
    const nextEmptyIndex = newOtpValues.findIndex(val => val === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };
  
  const handleSubmit = async (otpCode?: string) => {
    const code = otpCode || otpValues.join("");
    
    if (code.length !== 6) {
      setErrorMessage("کد تایید باید 6 رقم باشد");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const response = await verifyOTP(phoneNumber, code, sessionId);
      
      if (response.success && response.data) {
        // Store tokens in localStorage
        if (response.data.token) {
          localStorage.setItem("arvan_access", response.data.token);
        }
        if (response.data.refreshToken) {
          localStorage.setItem("arvan_refresh", response.data.refreshToken);
        }
        
        setIsLoggedIn(true);
        setOtpValues(Array(6).fill(""));
        
        // Use Next.js router for navigation with small delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      } else {
        setErrorMessage(response.message);
        // Clear OTP on error
        setOtpValues(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setErrorMessage("خطا در تایید کد. لطفاً دوباره تلاش کنید.");
      setOtpValues(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setCountdown(expiresIn);
    setCanResend(false);
    setOtpValues(Array(6).fill(""));
    inputRefs.current[0]?.focus();
    onResend();
  };

  return (
    <div className="mt-3 sm:mt-4 flex flex-col gap-2 h-[280px] sm:h-[300px]">
      {errorMessage && (
        <div className="text-red-500 text-xs sm:text-sm text-center p-2 bg-red-50 rounded">
          {errorMessage}
        </div>
      )}
      
      <div className="flex flex-col gap-2 flex-grow">
        <div className="text-center mb-2">
          <p className="text-sm text-gray-600">
            کد تایید به شماره <span className="font-semibold" dir="ltr">{phoneNumber}</span> ارسال شد
          </p>
        </div>
        
         <div className="flex flex-col gap-2">
           <label className="text-sm text-gray-700 text-center">کد تایید را وارد کنید </label>
           <div className="flex justify-center gap-2" style={{ flexDirection: 'row-reverse' }}>
            {otpValues.map((value, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center text-xl font-semibold border-2 focus:border-blue-500 focus:ring-0"
                dir="ltr"
                style={{ textAlign: 'center' }}
                autoComplete="off"
              />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-600 text-sm hover:underline"
            >
              ارسال مجدد کد
            </button>
          ) : (
            <p className="text-gray-500 text-sm">
              ارسال مجدد در {countdown} ثانیه
            </p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            size="sm" 
            className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
            type="button"
            onClick={onBack}
          >
            بازگشت
          </Button>
          <Button 
            size="sm" 
            className="px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base" 
            type="button"
            onClick={() => handleSubmit()}
            disabled={isLoading || otpValues.some(val => val === "")}
          >
            {isLoading ? "در حال تایید..." : "تایید کد"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { OTPVerification };
