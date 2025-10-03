"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)";
import { Button } from "./button";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullscreenMenu = ({ isOpen, onClose }: FullscreenMenuProps) => {
  const { isLoggedIn } = useAuth();

  const menuItems = [
    {
      id: "home",
      label: "خانه",
      icon: "i-fluent:home-24-regular",
      href: "/",
    },
    {
      id: "tickets",
      label: "بلیط هواپیما",
      icon: "i-fluent:airplane-24-regular",
      href: "/tickets",
    },
    {
      id: "hotels",
      label: "هتل",
      icon: "i-fluent:building-24-regular",
      href: "/hotels",
    },
    {
      id: "about",
      label: "درباره ما",
      icon: "i-fluent:info-24-regular",
      href: "/aboutus",
    },
    {
      id: "contact",
      label: "تماس با ما",
      icon: "i-fluent:mail-24-regular",
      href: "/contactus",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-40 flex flex-col" style={{ height: 'calc(100vh - 80px)', bottom: '80px' }} dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between pt-16 pb-8 px-6">
        <div className="w-10"></div>
        <h2 className="text-2xl font-bold text-gray-900">منوها</h2>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
            >
              <div className="w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-gray-900">
                <span className={`${item.icon} text-xl`}></span>
              </div>
              <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* System Section */}
      <div className="px-6 pb-8">
        {/* System Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 flex items-center justify-center">
            <img src="/img/Vora Logo.png" alt="Vora Logo" className="w-6 h-6" />
          </div>
          <span className="text-lg font-medium text-gray-700">سامانه</span>
        </div>

        {/* Login/Register Button */}
        <div>
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-3 w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
          >
            <div className="w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-gray-900">
              <span className="i-fluent:person-add-24-regular text-xl"></span>
            </div>
            <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">ورود / ثبت نام</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { FullscreenMenu };
