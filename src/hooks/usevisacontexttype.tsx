"use client"
import { PassportInfo } from "@/app/dashboard/components";
import React, { createContext, useContext, useState } from "react";

interface VisaContextType {
  visaRequests: PassportInfo[];
  setVisaRequests: (visas: PassportInfo[]) => void;
  selectedPassenger: PassportInfo | undefined;
  setSelectedPassenger: (passenger: PassportInfo | undefined) => void;
}

const VisaContext = createContext<VisaContextType | undefined>(undefined);

export const VisaProvider = ({ children }: { children: React.ReactNode }) => {
  const [visaRequests, setVisaRequests] = useState<PassportInfo[]>([]);
  const [selectedPassenger, setSelectedPassenger] = useState<PassportInfo | undefined>(undefined);

  return (
    <VisaContext.Provider
      value={{
        visaRequests,
        setVisaRequests,
        selectedPassenger,
        setSelectedPassenger,
      }}
    >
      {children}
    </VisaContext.Provider>
  );
};

const useVisa = () => {
  const context = useContext(VisaContext);
  if (!context) {
    throw new Error("useVisa must be used within a VisaProvider");
  }
  return context;
};

export { useVisa };
