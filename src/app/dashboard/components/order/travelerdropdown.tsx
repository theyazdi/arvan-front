"use client";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { ReactNode } from "react";

interface TravelerDropdownProps {
  children: ReactNode;
  title: string;
  icon: string;
}

function TravelerDropdown({ children, title, icon }: TravelerDropdownProps) {
  return (
    <CustomDropdown
      title={title}
      icon={icon}
      contentClassName="w-156"
      closeOnOutsideClick={false}
    >
      {children}
    </CustomDropdown>
  );
}

export { TravelerDropdown };
