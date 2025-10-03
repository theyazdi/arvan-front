"use client";
import React from "react";
import { Navbar, BottomNavigationWrapper } from "@/components/ui";
import { useAuth } from "@/app/(auth)";

function MenusPage() {
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

  const userMenuItems = [
    {
      id: "dashboard",
      label: "داشبورد",
      icon: "i-fluent:home-24-regular",
      href: "/dashboard",
    },
    {
      id: "orders",
      label: "سفارش های من",
      icon: "i-fluent:task-list-square-24-regular",
      href: "/dashboard",
    },
    {
      id: "shopping-list",
      label: "لیست خریدها",
      icon: "i-fluent:shopping-bag-24-regular",
      href: "/dashboard",
    },
    {
      id: "package-cart",
      label: "سبد خرید بسته ها",
      icon: "i-fluent:cart-24-regular",
      href: "/dashboard",
    },
    {
      id: "passenger-info",
      label: "اطلاعات مسافرها",
      icon: "i-fluent:slide-text-person-24-regular",
      href: "/dashboard",
    },
    {
      id: "visa-request",
      label: "درخواست ویزا",
      icon: "i-fluent:contact-card-ribbon-24-regular",
      href: "/dashboard",
    },
    {
      id: "settings",
      label: "تنظیمات",
      icon: "i-fluent:person-24-regular",
      href: "/dashboard",
    },
    {
      id: "logout",
      label: "خروج",
      icon: "i-fluent:sign-out-24-regular",
      href: "/login",
    },
  ];

  return (
    <BottomNavigationWrapper>
      <Navbar />
      <div className="min-h-screen bg-white" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-center pt-16 pb-8">
          <h1 className="text-2xl font-bold text-gray-900">منوها</h1>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col justify-center px-6">
          <div className="space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
              >
                <div className="w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-gray-900">
                  <span className={`${item.icon} text-xl`}></span>
                </div>
                <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* System Section */}
        <div className="px-6 pb-8 mt-8">
          {/* System Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 flex items-center justify-center">
              <img src="/img/Vora Logo.png" alt="Vora Logo" className="w-6 h-6" />
            </div>
            <span className="text-lg font-medium text-gray-700">VORA سامانه</span>
          </div>

          {/* User Menu Items or Login Button */}
          {isLoggedIn ? (
            <div className="space-y-2">
              {userMenuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-gray-900">
                    <span className={`${item.icon} text-xl`}></span>
                  </div>
                  <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div>
              <a
                href="/login"
                className="flex items-center gap-3 w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
              >
                <div className="w-8 h-8 flex items-center justify-center text-gray-600 group-hover:text-gray-900">
                  <span className="i-fluent:person-add-24-regular text-xl"></span>
                </div>
                <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">ورود / ثبت نام</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </BottomNavigationWrapper>
  );
}

export default MenusPage;
