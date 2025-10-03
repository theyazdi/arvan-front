"use client";
import { Button } from "@/components/ui";

import { SignupProgressBar } from "./signupProgressBar";

interface SignupWizardLayoutProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
  handleBackToSignup: () => void;
  handleCreateAccount: () => void;
  formRef?: React.RefObject<HTMLFormElement | null>;
}

function SignupWizardLayout({
  currentStep,
  children,
  handleBackToSignup,
  handleCreateAccount,
  formRef,
}: SignupWizardLayoutProps) {
  return (
    <div className="flex flex-col msx-h-[500px]">
      {currentStep !== 0 && (
        <div className="flex flex-col gap-6 w-full items-center">
          <SignupProgressBar currentStep={currentStep} />
        </div>
      )}
      {currentStep === 1 && (
        <p className="text-justify mt-10">
          لطفاً اطلاعات خواسته شده را ارائه دهید و به مرحله بعدی ایجاد حساب
          کاربری خود بروید.
        </p>
      )}
      {currentStep === 2 && (
        <p className="text-justify mt-10">
          لطفاً یک رمز عبور قوی برای امنیت حساب خود ارائه دهید و به داشبورد شخصی
          خود بروید
        </p>
      )}
      <div className="mt-4">{children}</div>
      <div className="mt-38 flex items-center justify-between flex-row-reverse">
        {currentStep === 1 && (
          <Button
            variant={"link"}
            className="hover:underline text-gray-5"
            onClick={handleBackToSignup}
          >
            برگشتن
          </Button>
        )}
        {currentStep === 2 && (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={handleBackToSignup}
            className="flex items-center gap-2"
          >
            برگشتن
            <span className="i-fluent:chevron-right-24-regular h-6 w-6"></span>
          </Button>
        )}
        {currentStep === 1 && (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => formRef?.current?.requestSubmit()}
            className="flex items-center gap-2 bg-[#f9fafb] ___"
          >
            <span className="i-fluent:chevron-left-24-regular h-6 w-6"></span>
            مرحله بعد
          </Button>
        )}
        {currentStep === 2 && (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={handleCreateAccount}
            className="flex items-center gap-2 px-10 py-3"
          >
            <span className="i-fluent:chevron-right-24-regular h-6 w-6"></span>
            ثبت نام
          </Button>
        )}
      </div>
    </div>
  );
}

export { SignupWizardLayout };
