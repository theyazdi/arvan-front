import clsx from "clsx";
interface VisaProgressBarProps {
    currentStep : number  
}
 
function VisaProgressBar({currentStep} : VisaProgressBarProps) {
  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <h3 className="font-bold">Creating an account</h3>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 justify-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                currentStep >= 1 ? "bg-green-5" : "bg-gray-200"
              }`}
            ></div>
            <span
              className={clsx(
                "text-xs mt-1",
                currentStep === 0 ? "font-medium" : ""
              )}
            >
              Step one
            </span>
          </div>
          <div
            className={`h-[1px] w-15 rounded-full mb-6 ${
              currentStep >= 1 ? "bg-green-5" : "bg-gray-200"
            }`}
          ></div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-gray-200"></div>
            <span
              className={clsx(
                "text-xs mt-1",
                currentStep === 1 ? "font-medium" : ""
              )}
            >
              Step two
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { VisaProgressBar };
