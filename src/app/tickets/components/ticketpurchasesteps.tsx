"use client";
import { WizardProvider } from "@/hooks";
import { BuyTicketLayout } from "./buyticketlayout";

function TicketPurchaseSteps() {
  
  return (
    <WizardProvider totalSteps={5}>
        <BuyTicketLayout />
    </WizardProvider>
  );
}

export { TicketPurchaseSteps };
