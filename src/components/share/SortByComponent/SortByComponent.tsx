"use client";

import {
  ArrowSort24Regular,
} from "@fluentui/react-icons";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface SortOption {
  label: string;
  icon: ReactNode;
  value: string;
}

interface SortByComponentProps {
  title?: string;
  options: SortOption[];
  activeOption: string;
  formAction: string;
  formData: Record<string, string>;
  onSortChange?: (option: string) => void;
}

const SortByComponent = ({ 
  title = "Sort By",
  options,
  activeOption,
  formAction,
  formData,
  onSortChange
}: SortByComponentProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-row-reverse items-center justify-between mb-4">
        <div className="flex flex-row-reverse items-center gap-2">
          <ArrowSort24Regular />
          <span className="text-lg font-semibold">{title}</span>
        </div>
      </div>
      <div className="relative w-full">
        <select
          className="w-full rounded-xl border border-gray-200 py-3 px-4 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm appearance-none text-base font-medium cursor-pointer"
          defaultValue={activeOption}
          name="sort_by"
        >
          {options.map((option, idx) => (
            <option key={idx} value={option.value} className="text-base">
              {option.label}
            </option>
          ))}
        </select>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <ArrowSort24Regular />
        </span>
      </div>
    </div>
  );
};

export { SortByComponent }; 