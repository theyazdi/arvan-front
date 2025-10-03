"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/(auth)";

const BottomNavigation = () => {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  const navItems = [
    {
      id: "home",
      label: "خانه",
      icon: "i-fluent:home-24-regular",
      iconFilled: "i-fluent:home-24-filled",
      href: "/",
    },
    {
      id: "smart-feature",
      label: "ویژگی هوشمند",
      icon: "i-fluent:sparkle-24-regular",
      iconFilled: "i-fluent:sparkle-24-filled",
      href: "/smart-features",
    },
    {
      id: "account",
      label: "حساب کاربری",
      icon: "i-fluent:person-24-regular",
      iconFilled: "i-fluent:person-24-filled",
      href: isLoggedIn ? "/dashboard" : "/login",
    },
    {
      id: "menus",
      label: "منوها",
      icon: "i-fluent:grid-24-regular",
      iconFilled: "i-fluent:grid-24-filled",
      href: "/menus",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-2xl mx-2 mb-2 md:hidden shadow-lg">
      <div className="flex items-center justify-around py-2 ">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.id}
              href={item.href!}
              className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div
                className={`w-6 h-6 mb-1 flex items-center justify-center ${
                  isActive ? "text-black font-bold" : "text-gray-500"
                }`}
              >
                <span className={`${isActive ? item.iconFilled : item.icon} ${isActive ? 'font-bold' : ''}`}></span>
              </div>
              <span
                className={`text-center leading-tight flex items-center justify-center ${
                  isActive ? "text-black font-bold" : "text-gray-500 font-medium"
                } ${item.id === 'smart-feature' ? 'text-xs' : 'text-xs'}`}
                style={{ fontSize: item.id === 'smart-feature' ? '10px' : '12px' }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export { BottomNavigation };
