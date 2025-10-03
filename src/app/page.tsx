import React from "react";
import { Metadata } from "next";
import {
  PageIntro,
  Experiences,
  TravelPlannerCard,
  TravelBlogs,
  Faq,
  MobileSearchBar,
} from "@/app/components";
import { TravelBanner } from "./components/travelStats/travelBanner";
import SearchBar from "./components/searchBar";
import { Navbar, Footer, BottomNavigationWrapper, MobileHeader } from "@/components/ui";
import { SmartTravel } from "./aboutus";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata("/");

function Home() {
  return (
    <BottomNavigationWrapper>
      <Navbar />
      <div className="container mx-auto  px-4">
        <div className="mt-8">
          <PageIntro />
        </div>
        <div className="md:mt-13 mt-8 flex items-center justify-center w-full">
          <SearchBar />
          <MobileSearchBar />
        </div>
        <div className="mt-30 md:block">
          <TravelPlannerCard />
        </div>
        <div className="mt-30">
          <SmartTravel
            title="بهترین تجربیات در انتظار شما"
            icon="i-fluent:sparkle-16-filled"
            subtitle="ما هر سفر را دقیقاً مطابق نیاز، بودجه و سلیقه شما طراحی می‌کنیم. از مقصد و زمان حرکت تا نوع اقامت، همه‌چیز کاملاً منحصر به فرد است. با ما، سفری را تجربه می‌کنید که به طور خاص برای شما طراحی شده است."
          />
        </div>
        
        <div className="mt-30 md:block">
          <TravelBanner />
        </div>
        <div className="mt-40">
          <TravelBlogs />
        </div>
        <div className="mt-40 w-full">
          <Faq type="home" />
        </div>
      </div>
      <Footer />
    </BottomNavigationWrapper>
  );
}

export default Home;
