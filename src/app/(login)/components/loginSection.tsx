import React from "react";
import { FormLogin } from "@/app/(login)";
import { SocialLoginButtons } from "@/app/(login)";

function LoginSection() {

  
  return (
    <div className="flex flex-col w-full">
      <SocialLoginButtons />
      <div className="flex items-center gap-2 mt-3 sm:mt-4">
        <hr className="w-full border-gray-300" />
        <span className="text-xs text-gray-500 px-2">یا</span>
        <hr className="w-full border-gray-300" />
      </div>
      <div>
        <FormLogin />
      </div>
    </div>
  );
}

export { LoginSection };
