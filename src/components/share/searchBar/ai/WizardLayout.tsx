import { Button } from "@/components/ui";
import {
  ChevronLeft16Regular,
  ChevronRight16Regular,
  Search16Regular,
} from "@fluentui/react-icons";
import { ProgressBar } from "@/components/ui";
import { useState, useEffect } from "react";

interface WizardLayoutProps {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  onBack: () => void;
  onNext: () => void;
  children: React.ReactNode;
  isLastStep: boolean;
  isFirstStep: boolean;
}

function WizardLayout({
  currentStep,
  totalSteps,
  goToStep,
  onBack,
  onNext,
  children,
  isLastStep,
  isFirstStep,
}: WizardLayoutProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    setIsVisible(false);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsTransitioning(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [currentStep]);
  return (
    <div className="w-full flex flex-col">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        goToStep={goToStep}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between ">
        <div 
          className={`flex-1 transition-opacity duration-300 ease-in-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {children}
        </div>
        <div className="md:flex hidden items-center gap-2 mt-15 flex-none">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ChevronRight16Regular />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={onNext}
            disabled={currentStep === totalSteps}
          >
            {isLastStep ? <Search16Regular /> : <ChevronLeft16Regular />}
          </Button>
        </div>
        <div className="md:hidden mt-15">
          <div className={`${isFirstStep ? "w-full" : "hidden"}`}>
            <Button
              variant="default"
              onClick={onNext}
              className="w-full rounded-xl bg-[#33363B]"
            >
              مرحله بعد
              <span className="i-fluent:ios-arrow-24-regular"></span>
            </Button>
          </div>
          <div
            className={`${isFirstStep ? "hidden" : "flex items-center gap-2"}`}
          >
            <Button
              variant="default"
              onClick={onBack}
              className="w-full rounded-xl bg-white text-black border border-gray-300"
            >
              <span className="i-fluent:ios-arrow-rtl-24-regular"></span>
              مرحله قبل
            </Button>
            <Button
              variant="default"
              onClick={onNext}
              className="w-full rounded-xl bg-[#33363B]"
            >
              {isLastStep ? "جستجو" : "مرحله بعد"}
              {isLastStep ? <span className="i-fluent:search-24-regular h-6 w-6"></span> : <span className="i-fluent:ios-arrow-24-regular"></span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WizardLayout;
