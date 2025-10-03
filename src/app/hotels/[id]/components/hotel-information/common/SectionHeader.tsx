"use client";

import { ReactNode } from "react";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, className = "" }) => (
  <h3 className={`text-lg font-medium mb-4 flex items-center gap-2 ${className}`}>
    {icon}
    {title}
  </h3>
); 