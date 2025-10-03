"use client";
import { useSearchParams } from "next/navigation";
import { HotelsWithParams, HotelsWithoutParams } from "./components";
import { Footer, BottomNavigationWrapper } from "@/components/ui";
import { SecondaryNavbar } from "@/components/ui/secondary-navbar";

function HotelsClient() {
  const searchParams = useSearchParams();
  const hasQueryParams = searchParams.toString().length > 0;

  return (
    <BottomNavigationWrapper>
      <SecondaryNavbar />
      <div className="px-4 md:px-0">
        {hasQueryParams ? <HotelsWithParams /> : <HotelsWithoutParams />}
      </div>
      {!hasQueryParams && <Footer />}
    </BottomNavigationWrapper>
  );
}

export default HotelsClient;
