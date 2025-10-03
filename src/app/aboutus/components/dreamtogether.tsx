"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../../../public/img/1.png";

const dreamFeatures = [
  {
    icon: <span className="i-fluent:building-home-24-regular w-6 h-6"></span>,
    title: "درخواست اقامتگاه",
    desc: "شما را به قلب بهترین مکان‌ها می‌بریم تا آرامش و خاطره‌ای شیرین را در سفر خود تجربه کنید.",
  },
  {
    icon: <span className="i-fluent:airplane-48-filled w-6 h-6"></span>,
    title: "خرید بلیط هواپیما",
    desc: "ما بهترین پروازها را با مناسب‌ترین قیمت‌ها مطابق با بودجه شما ارائه می‌دهیم تا سفرتان را بدون نگرانی آغاز کنید.",
  },

  {
    icon: <span className="i-fluent:sparkle-24-regular w-6 h-6"></span>,
    title: "ویژگی های هوشمند",
    desc: "آرون تراول با بهره‌گیری از فناوری‌های هوشمند، سفر شما را دقیقاً بر اساس بودجه، سلیقه و زمان‌بندی درست انتخاب می کند می‌کند.",
  },
  {
    icon: <span className="i-fluent:contact-card-ribbon-28-filled w-6 h-6"></span>,
    title: "ویزای امارات",
    desc: "آرون تراول با ارائه خدمات کامل و به‌روز ویزای امارات، فرآیند دریافت ویزا را برای شما آسان و سریع می‌کند. با پشتیبانی حرفه‌ای و مدارک مورد نیاز دقیق، سفرتان به امارات را بدون دغدغه آغاز کنید.",
  },
];

export function DreamTogether() {
  return (
    <section className="w-full flex flex-col gap-8 md:gap-20 md:flex-row items-center mb-12 justify-center">
      <div className="flex-2 flex mb-8 md:mb-0">
        <div className="w-[300px] h-[400px] md:w-[420px] md:h-[700px] rounded-lg md:rounded-full overflow-hidden relative">
          <Image
            src="/img/Frame 1000002143.png"
            alt="Dream Together"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start md:items-center max-w-xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Image src={Logo} alt="logo" className="w-20 md:w-25 hidden md:block" />
          <h2 className="text-2xl md:text-4xl font-black leading-tight mb-2 text-gray-800 text-right">
            تجربه سفری دلنشین با ما
          </h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8 text-start md:text-center">
          سفری که از دل خواسته‌هاتان شروع می‌شود و با آرامش، هیجان و خاطراتی به‌یادماندنی ادامه پیدا می‌کند. ما فقط سفر نمی‌سازیم، لحظه‌هایی می‌سازیم که همیشه دلتان برایشان تنگ می‌شود.

        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
          {dreamFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-4 md:p-6 flex items-start gap-3 min-w-[220px]"
            >
              <span className="mt-1 text-lg md:text-xl">{feature.icon}</span>
              <div>
                <div className="font-bold text-base md:text-lg mb-1 text-gray-800">
                  {feature.title}
                </div>
                <div className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {feature.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
