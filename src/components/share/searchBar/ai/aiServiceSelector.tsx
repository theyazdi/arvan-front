"use client";
import React, { useState, useEffect } from "react";
import CalculateExpenses from "./calculateExpenses";
import TravelAssistPlanning from "./travelAssistPlanning";
import TravelBasedOnBudget from "./travelBasedOnBudget";
import AiServiceSelectorButtons from "./aiServiceSelectorButtons";
import { WizardProvider } from "@/hooks/useWizard";

export type ServiceType =
  | "travelAssist"
  | "travelBug"
  | "travelCalculate"
  | "defult";

const SERVICE_STEPS: Record<ServiceType, number> = {
  travelAssist: 6,
  travelBug: 3,
  travelCalculate: 6,
  defult: 1,
};

function AIServiceSelector() {
  const [selectedService, setSelectedService] = useState<ServiceType>("defult");
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleServiceSelect = (service: ServiceType) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setIsVisible(false);
    
    setTimeout(() => {
      setSelectedService(service);
      setIsVisible(true);
      setIsTransitioning(false);
    }, 300);
  };

  const resetSelection = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setIsVisible(false);
    
    setTimeout(() => {
      setSelectedService("defult");
      setIsVisible(true);
      setIsTransitioning(false);
    }, 300);
  };

  const selectedServiceMap = (selectedService: ServiceType) => {
    const serviceMap = {
      travelAssist: <TravelAssistPlanning resetSelection={resetSelection} />,
      travelBug: <TravelBasedOnBudget resetSelection={resetSelection}/>,
      travelCalculate: <CalculateExpenses resetSelection={resetSelection}/>,
      defult: (
        <AiServiceSelectorButtons handleServiceSelect={handleServiceSelect} />
      ),
    };
    return serviceMap[selectedService];
  };

  return (
    <WizardProvider
      totalSteps={SERVICE_STEPS[selectedService]}
      initialStep={0}
      initialData={{ tripType: "one-way" }}
    >
      <div 
        className={`transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {selectedServiceMap(selectedService)}
      </div>
    </WizardProvider>
  );
}

export default AIServiceSelector;
