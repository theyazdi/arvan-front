"use client";
import clsx from "clsx";

interface VerticalStepNavigatorProps {
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

function VerticalStepNavigator({
  currentStep,
  totalSteps,
  onBack,
  steps,
  goToStep,
  title,
}: VerticalStepNavigatorProps) {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const toPersianNumber = (num: number) => {
    return num.toString().replace(/\d/g, (digit) => persianNumbers[parseInt(digit)]);
  };
  const getStepText = (num: number) => {
    const persianOrdinals = ['', 'اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم', 'نهم', 'دهم'];
    return persianOrdinals[num] || toPersianNumber(num);
  };

  return (
    <div className="py-4 px-2">
      <div className="flex flex-col gap-4">
        {steps
          .filter((step) => step.number <= currentStep + 1)
          .map((step, index) => (
            <div key={step.key} className="flex items-center gap-2">
              <div
                className={clsx(
                  "px-4 py-2 rounded-2xl flex items-center gap-1 text-white font-medium text-sm cursor-pointer",
                  {
                    "bg-[#89C871]": step.number < currentStep + 1,
                    "bg-[#33363B]": step.number === currentStep + 1,
                  }
                )}
                onClick={() => {
                  if (step.number <= currentStep + 1) {
                    goToStep(step.number - 1);
                  }
                }}
              >
                {step.number < currentStep + 1 ? (
                  <span className="i-fluent:checkmark-24-filled h-4 w-4 text-white"></span>
                ) : (
                  <span className="i-fluent:circle-24-regular h-4 w-4 text-white"></span>
                )}
                <span>قدم {getStepText(step.number)}</span>
              </div>
              
              <span className="text-gray-900 font-medium">
                {step.title}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export { VerticalStepNavigator };
