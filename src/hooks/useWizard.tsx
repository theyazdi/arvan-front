/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";

interface WizardData {
  [key: string]: any;
}

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  data: WizardData;
  nextStep: () => void;
  prevStep: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setStepData: (key: string, stepData: any) => void;
  goToStep: (step: number) => void;
  resetWizard: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

interface WizardProviderProps {
  children: ReactNode;
  totalSteps: number;
  initialStep?: number;
  initialData?: WizardData;
}

export const WizardProvider: React.FC<WizardProviderProps> = ({
  children,
  totalSteps,
  initialStep = 0,
  initialData = {},
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [data, setData] = useState<WizardData>(initialData);

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setStepData = (key: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetWizard = () => {
    setCurrentStep(initialStep);
    setData(initialData);
  };

  const value = {
    currentStep,
    totalSteps,
    data,
    nextStep,
    prevStep,
    setStepData,
    goToStep,
    resetWizard,
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};

export default useWizard;
