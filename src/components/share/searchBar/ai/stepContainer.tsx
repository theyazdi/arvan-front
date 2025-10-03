import React, { useState, useEffect } from "react";

interface StepContainerProps {
  children: React.ReactNode;
  title: string;
}

function StepContainer({ children, title }: StepContainerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`flex flex-col md:gap-2 gap-4 mt-4 md:mt-0 w-full md:py-4 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h2 className="font-bold text-lg text-[#33363B]">{title}</h2>
      <div className="md:mt-4">{children}</div>
    </div>
  );
}

export default StepContainer;
