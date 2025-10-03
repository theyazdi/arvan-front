import React from "react";
import VoraLogo from "../../../../public/img/Vora Logo.png";
import TeravelBanner from "../../../../public/img/18914f6f3ddf8b69553d8a651c94fcfb.jpg";
import Image from "next/image";
import { TravelStats } from "@/app/components";

function TravelBanner() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-12">
      <div className="w-[250px] h-[375px] sm:w-[300px] sm:h-[450px] md:w-[410px] md:h-[600px] rounded-full overflow-hidden">
        <Image
          src={TeravelBanner}
          alt="Travel Banner"
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      <div className="max-w-lg flex flex-col gap-4 sm:gap-6 md:gap-8">
        <div className="w-[220px] h-[77px] sm:w-[250px] sm:h-[87px] md:w-[280px] md:h-[98px] flex justify-center items-center mx-auto md:mx-0">
          <Image src={VoraLogo} alt="Vora Logo" className="filter brightness-0 saturate-100 hue-rotate-200" />
        </div>
        <h2 className="hidden md:block text-3xl font-bold leading-relaxed mt-2 text-right">
          پیشتاز در تکنولوژی
        </h2>
        
        <p className="mt-4 text-gray-600 text-center sm:text-center md:text-right text-xs sm:text-sm md:text-base">
          ما با بهره‌گیری از جدیدترین فناوری‌های هوش مصنوعی، برنامه‌ریزی سفر را به مرحله‌ای کاملاً هوشمند ارتقا داده‌ایم. سیستم ما با تحلیل دقیق بودجه، بهترین مقاصد، هتل‌ها و برنامه‌های سفر را پیشنهاد می‌دهد. این فناوری پیشرفته، زمان برنامه‌ریزی را به حداقل رسانده و از هزینه‌های اضافی جلوگیری می‌کند، تا شما بتوانید با آرامش کامل، بهترین تجربه سفر را داشته باشید. 
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
          <TravelStats number={20} text="تجربه خدمت رسانی" />
          <TravelStats number={100} text="شرکت هواپیمایی" title="بیش از"/>
          <TravelStats number={2000} text="مسافر در ماه" title="بیش از"/>
        </div>
      </div>
    </div>
  );
}

export { TravelBanner };
