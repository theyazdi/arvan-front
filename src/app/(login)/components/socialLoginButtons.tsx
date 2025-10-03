import { Button } from "@/components/ui";
import React from "react";



function SocialLoginButtons() {

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full">
      <Button
        variant={"outline"}
        className="w-full bg-[#f9fafb] flex items-center justify-start text-sm sm:text-base py-2 sm:py-3"
        onClick={() =>{}}
      >
        ورود از طریق گوگل
      </Button>
      <Button
        variant={"outline"}
        className="w-full bg-[#f9fafb] flex items-center justify-start text-sm sm:text-base py-2 sm:py-3"
        onClick={() => alert("Facebook login هنوز پیاده‌سازی نشده")}
      >
        ورود از طریق فیس بوک
      </Button>
    </div>
  );
}

export { SocialLoginButtons };
