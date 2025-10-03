"use client";
import { useState } from "react";
import { HeaderSection, TabButtons, TabContent } from "@/app/components";

const options = [
  { id: "Trip Planner", label: "برنامه‌ریز سفر" },
  { id: "Travelling on a Budget", label: "سفر با بودجه محدود" },
  { id: "Cost Expenses", label: "هزینه‌ها" },
];

function TravelPlannerCard() {
  const [selectedTab, setSelectedTab] = useState("Trip Planner");
  const [visitedTabs, setVisitedTabs] = useState<string[]>(["Trip Planner"]);

  const handleTabChange = (tab: string) => {
    if (!visitedTabs.includes(tab)) {
      setVisitedTabs((prevVisited) => [...prevVisited, tab]);
    }
    setSelectedTab(tab);
  };

  const getVisibleTabs = () => {
    const selectedIndex = options.findIndex((opt) => opt.id === selectedTab);
    return visitedTabs.filter((tab) => {
      const tabIndex = options.findIndex((opt) => opt.id === tab);
      return tabIndex <= selectedIndex;
    });
  };

  const visibleTabs = getVisibleTabs();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-10 items-center justify-center">
        <HeaderSection />
        <div className="hidden md:block">
          <TabButtons
            options={options}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
      <TabContent visibleTabs={visibleTabs} selectedTab={selectedTab} />
    </div>
  );
}

export { TravelPlannerCard };
