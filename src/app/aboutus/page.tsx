import React from "react";
import { Metadata } from "next";
import {
  AboutHero,
  AboutInfo,
  DreamTogether,
  SmartTravel,
} from "@/app/aboutus/index";
import { Navbar, Footer, BottomNavigationWrapper } from "@/components/ui";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata("/aboutus");

function page() {
  return (
    <BottomNavigationWrapper>
      <Navbar />
      <main className="px-4 md:px-0">
        <AboutHero />
        <div className="flex flex-col gap-16 md:gap-36 max-w-7xl mx-auto">
          <AboutInfo />
          <SmartTravel
            title="تجربه سفری هوشمند با ما"
            icon="i-fluent:sparkle-48-filled"
            type="aboutus"
            subtitle="آرون تراول با برنامه‌ریزی هوشمندانه، سفری دقیق و متناسب با بودجه شما طراحی می‌کند و هزینه‌های سفر را به‌صورت کامل و شفاف محاسبه می‌کند."
          />
          <DreamTogether />
        </div>
      </main>
      <Footer />
    </BottomNavigationWrapper>
  );
}
export default page;
