import { Metadata } from "next";
import { TicketsWithParams , TicketsWithoutParams } from "@/app/tickets/components/index";
import { Footer, BottomNavigationWrapper } from "@/components/ui";
import { SecondaryNavbar } from "@/components/ui/secondary-navbar";
import { generatePageMetadata } from "@/lib/metadata";
import TicketsClient from "./tickets-client";

export const metadata: Metadata = generatePageMetadata("/tickets");

function Tickets() {
  return <TicketsClient />;
}

export default Tickets;
