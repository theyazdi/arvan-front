"use client";
import React, { useState, useRef, useEffect } from "react";


const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Create a temporary element to measure the content
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.visibility = 'hidden';
      tempElement.style.height = 'auto';
      tempElement.style.width = contentRef.current.offsetWidth + 'px';
      tempElement.innerHTML = `<p class="mt-2 text-gray-600">${answer}</p>`;
      
      document.body.appendChild(tempElement);
      const naturalHeight = tempElement.offsetHeight;
      document.body.removeChild(tempElement);
      
      setHeight(isOpen ? naturalHeight : 0);
    }
  }, [isOpen, answer]);

  return (
    <div className="border rounded-xl md:px-8 p-6 md:py-4 border-gray-200">
      <button
        className="flex md:justify-between justify-start text-right md:items-center items-start w-full md:text-lg text-base md:gap-50 gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <span className="i-fluent:chevron-down-24-regular h-8 w-8"></span>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef}>
          <p className="mt-2 text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export { FAQItem };
