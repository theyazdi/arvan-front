"use client";

import { ReactNode } from "react";
import { TabsTrigger } from "@/components/ui/tabs";

interface TabTriggerProps {
  value: string;
  icon: ReactNode;
  label: string;
}

export const TabTrigger: React.FC<TabTriggerProps> = ({ value, icon, label }) => (
  <TabsTrigger 
    value={value} 
    className="flex-1 flex flex-row-reverse items-center justify-center gap-1 md:gap-2 bg-white border border-gray-200 rounded-full px-2 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium [&_*]:text-black [&]:text-black data-[state=active]:bg-gray-100 data-[state=active]:border-gray-200"
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
    <span className="sm:hidden text-xs">{label.split(' ')[0]}</span>
  </TabsTrigger>
); 