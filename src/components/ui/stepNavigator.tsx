"use client";
import { Flow24Regular } from "@fluentui/react-icons";
import { Button } from "@/components/ui";
import clsx from "clsx";

interface StepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  steps: {
    title: string;
    number: number;
    key: string;
    icon?: React.ReactNode;
    iconFilled?: React.ReactNode;
  }[];
  goToStep: (step: number) => void;
  title: string;
  model: "ticket" | "hotel";
}

function StepNavigator({
  currentStep,
  totalSteps,
  onBack,
  steps,
  goToStep,
  title,
}: StepNavigatorProps) {
  return (
    <div
      className="bg-white px-3 md:px-4 py-3 md:py-4 rounded-2xl flex-col gap-3 md:gap-4 md:flex hidden"
      dir="rtl"
    >
      <div className="flex justify- items-center min-h-[18px] md:min-h-[40px]">
        <div className="flex items-center gap-2 md:gap-3">
          <Flow24Regular className="w-4 h-4 md:w-5 md:h-5" />
          <h3 className="text-xs md:text-lg font-bold">{title}</h3>
        </div>
      </div>
      <div className="flex items-center w-full relative">
        {steps.map((step, index) => (
          <div key={step.key} className="flex-1 flex items-center relative">
            {index < steps.length - 1 && (
              <div
                className={clsx(
                  "absolute top-3 md:top-4 right-[calc(50%+4px)] md:right-[calc(50%+16px)] h-[2px] z-0",
                  "w-[calc(100%-8px)] md:w-[calc(100%-32px)]",
                  {
                    "bg-red-500": step.number < currentStep + 1,
                    "bg-gray-300": step.number >= currentStep + 1,
                  }
                )}
              />
            )}

            <div className="flex flex-col items-center gap-1 md:gap-2 w-full relative z-10">
              <Button
                size={"icon"}
                className={clsx(
                  "w-4 h-4 md:w-8 md:h-8 rounded-full flex items-center justify-center hover:bg-[#fef5f5] shrink-0",
                  {
                    "bg-[#fef5f5] border border-red-500":
                      step.number === currentStep + 1,
                    "bg-red-1": step.number < currentStep + 1,
                    "bg-[#FAFAFA]": step.number > currentStep + 1,
                  }
                )}
                onClick={() => {
                  if (step.number <= currentStep + 1) {
                    goToStep(step.number - 1);
                  }
                }}
              >
                <div className="flex flex-col justify-center">
                  {step.number <= currentStep + 1 ? step.iconFilled : step.icon}
                </div>
              </Button>
              <span className="text-xs md:text-sm font-medium text-center leading-tight px-1">
                {step.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { StepNavigator };
