"use client";
import { useSearchParams } from "next/navigation";
import { TicketsWithParams , TicketsWithoutParams } from "@/app/tickets/components/index";
import { Footer, BottomNavigationWrapper } from "@/components/ui";
import { SecondaryNavbar } from "@/components/ui/secondary-navbar";

function TicketsClient() {
  const searchParams = useSearchParams();
  const hasQueryParams = searchParams.toString().length > 0;

  return (
    <BottomNavigationWrapper>
      <SecondaryNavbar />
      <div>
        {hasQueryParams ? <TicketsWithParams /> : <TicketsWithoutParams />}
      </div>
      {!hasQueryParams && <Footer />}
    </BottomNavigationWrapper>
  );
}

export default TicketsClient;
