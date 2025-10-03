"use client";

interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ className = "" }) => (
  <div className={`h-px bg-gray-200 ${className}`} />
); 