"use client";
import clsx from "clsx";

interface HorizontalStepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  steps: {
    title: string;
    number: number;
    key: string;
    icon?: React.ReactNode;
    iconFilled?: React.ReactNode;
  }[];
  goToStep: (step: number) => void;
}

function HorizontalStepNavigator({
  currentStep,
  steps,
  goToStep,
}: HorizontalStepNavigatorProps) {
  const paymentSteps = steps.filter(step => step.number >= 3 && step.number <= 4);
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg" dir="rtl">
      <div className="flex items-center justify-center gap-2">
        {paymentSteps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            {/* Step Icon and Text */}
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200",
                  {
                    "bg-white border-2 border-red-500": step.number === currentStep + 1,
                    "bg-gray-300": step.number !== currentStep + 1,
                  }
                )}
                onClick={() => {
                  if (step.number <= currentStep + 1) {
                    goToStep(step.number - 1);
                  }
                }}
              >
                <div className="flex items-center justify-center">
                  {step.number === currentStep + 1 ? step.iconFilled : step.icon}
                </div>
              </div>
              <span
                className={clsx(
                  "text-sm font-medium whitespace-nowrap",
                  {
                    "text-gray-900": step.number === currentStep + 1,
                    "text-gray-600": step.number !== currentStep + 1,
                  }
                )}
              >
                {step.title}
              </span>
            </div>
            
            {/* Arrow separator */}
            {index < paymentSteps.length - 1 && (
              <div className="mx-2">
                <span className="i-fluent:chevron-left-24-regular w-4 h-4 text-gray-600"></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export { HorizontalStepNavigator };
