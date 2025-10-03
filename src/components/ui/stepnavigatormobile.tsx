"use client";
import clsx from "clsx";
import { Button } from "./button";

interface StepNavigatorMobileProps {
  currentStep: number;
  steps: {
    title: string;
    number: number;
    key: string;
    icon?: React.ReactNode;
    iconFilled?: React.ReactNode;
  }[];
  goToStep: (step: number) => void;
}

function StepNavigatorMobile({
  currentStep,
  steps,
  goToStep,
}: StepNavigatorMobileProps) {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {steps.map((step) => (
          <div
            className="flex items-center gap-4 cursor-pointer flex-shrink-0"
            key={step.key}
            onClick={() => {
              if (step.number <= currentStep ) {
                goToStep(step.number);
              }
            }}
          >
            <div className="flex items-center gap-4">
              <Button
                size={"icon"}
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#fef5f5] shrink-0",
                  {
                    "bg-[#fef5f5] border border-red-500":
                      step.number === currentStep,
                    "bg-red-1": step.number < currentStep,
                    "bg-[#FAFAFA]": step.number > currentStep,
                  }
                )}
                onClick={() => {
                  if (step.number <= currentStep + 1) {
                    goToStep(step.number);
                  }
                }}
              >
                <div className="flex flex-col justify-center">
                  {step.number <= currentStep + 1 ? step.iconFilled : step.icon}
                </div>
              </Button>
              <div className="flex items-center gap-2">
                <p
                  className={`${
                    step.number === currentStep  ? "font-bold" : ""
                  } 
              ${step.number < currentStep ? "font-bold" : "text-gray-9"}`}
                >
                  {step.title}
                </p>
                <span className="i-fluent:chevron-left-24-regular"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { StepNavigatorMobile };
