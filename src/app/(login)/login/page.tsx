"use client";
import React, { useState } from "react";
import Image from "next/image";
import LoginImage from "../../../../public/img/a5719b147a8fe9cf4a90f9d842083703-min.jpg";
import Logo from "../../../../public/img/Vora Logo.png";
import { TabBar, TabBarPage, LoginSection, SignupSection } from "@/app/(login)";
import clsx from "clsx";
import { WizardProvider } from "@/hooks";

function LoginPage() {
  const [activeTab, setActiveTab] = useState<TabBarPage>("ورود");
  const [showTabBar, setShowTabBar] = useState(true);
  return (
    <div className="flex items-center justify-start min-h-screen w-full mb-8 sm:mb-12 md:mb-16 lg:mb-20">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-34 w-full max-w-7xl px-4">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-fit rounded-[32px] overflow-hidden order-2 lg:order-1">
          <Image
            src={LoginImage}
            alt="login"
            width={519}
            className="w-full h-auto rounded-3xl"
          />
        </div>
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 min-h-[500px] lg:min-h-[600px] flex flex-col gap-4 items-center justify-start order-1 lg:order-2">
          <Image src={Logo} alt="logo" className="mb-2 sm:mb-4 w-32 sm:w-40 lg:w-auto" />
          <div className="w-full">
            {showTabBar && (
              <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
          </div>
          <div className="relative w-full flex-grow">
            <div
              className={clsx(
                "absolute inset-0 transition-opacity duration-300 ease-in-out",
                {
                  "opacity-100": activeTab === "ورود",
                  "opacity-0 pointer-events-none": activeTab !== "ورود",
                }
              )}
            >
              <LoginSection />
            </div>
            <div
              className={clsx(
                "absolute inset-0 transition-opacity duration-300 ease-in-out",
                {
                  "opacity-100": activeTab === "ثبت نام",
                  "opacity-0 pointer-events-none": activeTab !== "ثبت نام",
                }
              )}
            >
              <WizardProvider totalSteps={3}>
                <SignupSection setShowTabBar={setShowTabBar} />
              </WizardProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
