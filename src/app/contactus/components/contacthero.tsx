import React from "react";
import Image from "next/image";

export function ContactHero() {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-8 items-start justify-between">
        <div className="flex flex-col items-start min-w-[180px]">
          <h2 className="text-xl md:text-2xl font-bold mb-2">پشتیبانی</h2>
          <div className="mb-2">
            <Image
              src="/img/Vora Logo.png"
              alt="VORA Logo"
              width={90}
              height={40}
              className="invert-0 brightness-0"
            />
          </div>
        </div>
        <div className="flex-1 text-gray-700 leading-relaxed text-justify text-sm md:text-base">
          <p>
            در هر مرحله از برنامه‌ریزی سفر، اگر نیاز به راهنمایی، مشاوره یا پاسخ به سوالات خود دارید، تیم پشتیبانی آرون تراول در کنار شماست.ما با پشتیبانی ۲۴ ساعته و پاسخ‌گویی دقیق، تلاش می‌کنیم تجربه‌ای مطمئن و آرام از سفر برایتان فراهم کنیم.از طریق فرم تماس، شماره تلفن، ایمیل یا پیام در شبکه‌های اجتماعی می‌توانید به‌سادگی با ما ارتباط بگیرید.ما متعهد هستیم در کوتاه‌ترین زمان ممکن، پاسخ‌گوی نیازها و درخواست‌های شما باشیم.

          </p>
        </div>
      </div>
    </section>
  );
}
