import React from "react";

interface QuickAmenity {
  icon: React.ReactNode;
  label: string;
}

interface QuickAmenityItemProps extends QuickAmenity {
  isLast?: boolean;
}

export const QuickAmenityItem: React.FC<QuickAmenityItemProps> = ({ icon, label, isLast }) => (
  <div className={`flex flex-col items-center gap-1 md:gap-2 px-1 md:px-2 py-2 md:py-3 w-14 md:w-32 min-w-[50px] md:min-w-[100px] ${!isLast ? 'border-r' : ''}`}>
    <div className="text-black">
      {icon}
    </div>
    <span className="text-xs md:text-sm text-black text-center leading-tight">{label}</span>
  </div>
); 