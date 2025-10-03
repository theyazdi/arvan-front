"use client";
import React from "react";
import Image from "next/image";
import VoraLogo from "../../../../public/img/Vora Logo.png";

function toPersianNumber(str: string) {
  return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

const infoCards = [
  {
    title: "شفافیت و صداقت ",
    desc: "در ارائه خدمات",
    text: "ارائه خدمات صادقانه و قابل اعتماد، پایه و اساس کار ماست تا سفری مطمئن و رضایت‌بخش برای شما رقم بزنیم.",
  },
  {
    title: "فناوری های پیشرفته",
    desc: "",
    text: "ما با بهره‌گیری از فناوری‌های پیشرفته و هوش مصنوعی، برنامه‌ریزی سفر را دقیق‌تر، سریع‌تر و هوشمندانه‌تر می‌کنیم. این تکنولوژی‌ها به ما امکان می‌دهند تا بهترین گزینه‌های سفر را متناسب با بودجه و سلیقه شما پیشنهاد دهیم.",
  },
  {
    title: "برنامه ریزی ",
    desc: "صفر تا صد سفر",
    text: "آرون تراول، اولین و تنها سایت برنامه‌ریزی کامل سفر است که تمامی مراحل سفر شما را از انتخاب مقصد، هتل، بلیط هواپیما و حمل و نقل به‌صورت کاملاً هوشمندانه مدیریت می‌کند.",
  },
];

export function AboutInfo() {
  return (
    <section className="w-full flex flex-col items-center mb-12">
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-13 items-start mb-10">
        <div className="flex flex-col items-start min-w-[180px]">
          <h2 className="text-xl md:text-2xl font-bold mb-2">درباره ما</h2>
          <div className="mb-2">
            <Image
              src={VoraLogo}
              alt="VORA Logo"
              width={90}
              height={40}
              className="invert-0 brightness-0"
            />
          </div>
        </div>
        <div className="flex-1 text-gray-700 leading-relaxed text-justify text-sm md:text-base">
          <p>
            آرون تراول با هدف ساده‌سازی برنامه‌ریزی سفر و ارائه تجربه‌ای هوشمند و مقرون‌به‌صرفه شکل گرفته است. ما با استفاده از فناوری هوش مصنوعی، سفرهایی متناسب با بودجه، سلیقه و زمان شما طراحی می‌کنیم.شفافیت، دقت و شخصی‌سازی، سه اصل کلیدی خدمات ما هستند.در آرون تراول، سفر نه فقط آسان، بلکه دقیقاً همان‌طور است که شما می‌خواهید.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center">
        {infoCards.map((infoCard, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm p-4 md:p-6 flex-1 min-w-[220px]"
          >
            <div className="text-2xl md:text-3xl font-bold mb-2">
              {toPersianNumber(infoCard.title)}
            </div>
            <div className="text-gray-700 font-medium mb-2 text-sm md:text-base">
              {infoCard.desc}
            </div>
            <div className="text-gray-400 text-xs md:text-sm">
              <p>{infoCard.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
