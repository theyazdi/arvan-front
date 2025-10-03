"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendOTP } from "../actions/mobileAuth";
import { useState } from "react";

type MobileLoginForm = {
  phoneNumber: string;
};

const schema = z.object({
  phoneNumber: z
    .string()
    .min(11, "شماره موبایل باید 11 رقم باشد")
    .max(11, "شماره موبایل باید 11 رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

interface MobileLoginFormProps {
  onOTPSent: (phoneNumber: string, sessionId: string, expiresIn?: number) => void;
  onBack: () => void;
}

function MobileLoginForm({ onOTPSent, onBack }: MobileLoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MobileLoginForm>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = async (data: MobileLoginForm) => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const response = await sendOTP(data.phoneNumber);
      
      if (response.success && response.data) {
        onOTPSent(data.phoneNumber, response.data.sessionId, response.data.expiresIn);
        reset();
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("خطا در ارسال کد تایید. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="mt-3 sm:mt-4 flex flex-col gap-2 h-[280px] sm:h-[300px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorMessage && (
        <div className="text-red-500 text-xs sm:text-sm text-center p-2 bg-red-50 rounded">
          {errorMessage}
        </div>
      )}
      
      <div className="flex flex-col gap-2 flex-grow">
        <Input
          size="lg"
          placeholder="09123456789"
          label="شماره موبایل خود را وارد کنید"
          {...register("phoneNumber")}
          errorMessage={errors?.phoneNumber?.message}
          type="tel"
          dir="ltr"
        />
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
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export { MobileLoginForm };
