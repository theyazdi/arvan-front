import React from "react";
import { ServiceCard } from "@/app/dashboard/components";

const aiServices = [
  {
    title: "برآورد هزینه سفر",
    description:
      "لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده  از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه",
  },
  {
    title: "برنامه ریزی سفر",
    description:
      "لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده  از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه",
  },
  {
    title: "مسافرت با بودجه مشخص",
    description:
      "لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده  از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه",
  },
];

function AiServicesSection() {
  return (
    <div className="md:flex hidden flex-col gap-5">
      <div className="flex items-center gap-3 mt-32">
        <span className="i-fluent:sparkle-24-regular w-6 h-6"></span>
        <p className="text-xl font-bold">هوش مصنوعی</p>
      </div>
      <div className="flex flex-col gap-3">
        {aiServices.map((item, index) => (
          <ServiceCard
            description={item.description}
            title={item.title}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export { AiServicesSection };
