
import * as React from "react";

const ProgressStepper = ({ currentStep = 1, totalSteps = 4 }) => {
  const [step, setStep] = React.useState(currentStep);

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between mb-4 gap-3">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-3 border  border-black  rounded-full ${
              index + 1 <= step ? "bg-black" : "bg-white"
            }`}
          ></div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={step === totalSteps}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export { ProgressStepper };