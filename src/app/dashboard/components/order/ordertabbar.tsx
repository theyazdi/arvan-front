"use client";
import { useState } from "react";
import { FlightContent, HotelContent } from "@/app/dashboard/components";

type OrderSectionType = "flight" | "stay" | "train" | "ai";

interface SectionItem {
  key: OrderSectionType;
  icon: string;
  label: string;
  content: React.ReactNode;
}

function OrderTabBar({ token }: { token: string }) {
  const [section, setSection] = useState<OrderSectionType>("flight");

  const sectionList: SectionItem[] = [
    {
      key: "flight",
      icon: "i-fluent:airplane-16-regular",
      label: "هواپیما",
      content: <FlightContent token={token} />,
    },
    {
      key: "stay",
      icon: "i-fluent:building-home-16-regular",
      label: "هتل و اقامتگاه",
      content: <HotelContent token={token} />,
    },
    {
      key: "train",
      icon: "i-fluent:ticket-diagonal-16-regular",
      label: "قطار",
      content: <div>محتوای قطار</div>,
    },
    {
      key: "ai",
      icon: "i-fluent:sparkle-16-regular",
      label: "هوش مصنوعی",
      content: <div>محتوای هوش مصنوعی</div>,
    },
  ];

  return (
    <div className="mt-8 ">
      <ul className="flex items-center gap-3 cursor-pointer bg-white rounded-3xl p-3">
        {sectionList.map((item) => {
          const isActive = item.key === section;
          return (
            <li
              key={item.key}
              className={`flex items-center justify-center text-center gap-2 px-4 py-3 rounded-3xl w-full transition-all duration-300 ${
                isActive ? "bg-gray-900 text-white" : "border text-black"
              }`}
              onClick={() => setSection(item.key)}
            >
              <span className={item.icon}></span>
              <span className="font-300">{item.label}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4">
        {sectionList.find((item) => item.key === section)?.content}
      </div>
    </div>
  );
}

export { OrderTabBar };
