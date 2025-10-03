"use client";
import React from "react";
import { BottomNavigation } from "./bottomNavigation";

interface BottomNavigationWrapperProps {
  children: React.ReactNode;
}

const BottomNavigationWrapper = ({ children }: BottomNavigationWrapperProps) => {
  return (
    <div className="relative">
      {/* Main Content */}
      <div className="pb-20 md:pb-0">
        {children}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export { BottomNavigationWrapper };
