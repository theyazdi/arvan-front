import React from "react";
import { ServiceCard } from "@/app/dashboard/components";

const voraServices = [
  {
    title: "رزرو پرواز",
    description:
      "لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه",
    url: "/tickets",
  },
  {
    title: "رزرو اقامتگاه",
    description:
      "لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه",
    url: "/hotels",
  },
  {
    title: "درخواست ویزا امارات",
    description:
      "لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه",
  },
];

function VoraServicesSection() {
  return (
    <div className="md:flex flex-col gap-5 hidden ">
      <div className="flex items-center gap-3 mt-32">
        <span className="i-fluent:settings-24-regular w-6 h-6"></span>
        <p className="text-xl font-bold">سرویس‌های آرون</p>
      </div>
      <div className="flex flex-col gap-3">
        {voraServices.map((item, index) => (
          <ServiceCard
            description={item.description}
            title={item.title}
            url={item.url}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export { VoraServicesSection };
