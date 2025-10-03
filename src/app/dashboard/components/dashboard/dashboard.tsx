import React from "react";
import {
  AiServiceSectionMobile,
  AiServicesSection,
  VoraServicesectionMobile,
  VoraServicesSection,
} from "@/app/dashboard/components";

function Dashboard() {
  return (
    <div className="md:mt-14 mt-36">
      <h3 className="md:text-3xl md:font-medium text-xl font-bold text-center md:text-right">داشبورد</h3>
      <p className="font-300 text-gray-5 md:text-xl text-2xl  md:mt-5 mt-36 md:leading-15  md:text-right text-justify">
        لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است.
      </p>
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <AiServiceSectionMobile />
        <VoraServicesectionMobile />
        <VoraServicesSection />
        <AiServicesSection />
      </div>
    </div>
  );
}

export { Dashboard };
