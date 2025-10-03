import { Metadata } from "next";
import { HotelsWithParams, HotelsWithoutParams } from "./components";
import { Footer, BottomNavigationWrapper } from "@/components/ui";
import { SecondaryNavbar } from "@/components/ui/secondary-navbar";
import { generatePageMetadata } from "@/lib/metadata";
import HotelsClient from "./hotels-client";

export const metadata: Metadata = generatePageMetadata("/hotels");

function Hotels() {
  return <HotelsClient />;
}

export default Hotels;
