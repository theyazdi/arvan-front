"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-6">
    {icon}
    <h2 className="text-xl font-semibold">{title}</h2>
  </div>
); 