interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  size?: "small" | "large";
}

function ProgressBar({
  currentStep,
  totalSteps,
  goToStep,
  size = "small",
}: ProgressBarProps) {
  const height = size === "small" ? "h-1" : "h-2";
  const stepWidth = Math.floor(320 / totalSteps);
  const mobileStepWidth = Math.floor(240 / totalSteps);

  return (
    <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 w-full md:w-[320px] max-w-[240px] md:max-w-none mx-auto md:mx-0">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-1 md:gap-2 cursor-pointer"
          onClick={() => goToStep(index)}
        >
          <div
            className={`${height} rounded-full ${
              index <= currentStep ? "bg-black" : "border border-black"
            }`}
            style={{ width: `${mobileStepWidth}px` }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export { ProgressBar };
