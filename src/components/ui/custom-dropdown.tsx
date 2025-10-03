"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

interface CustomDropdownProps {
  children: ReactNode;
  title: string;
  icon: string;
  className?: string;
  contentClassName?: string;
  closeOnOutsideClick?: boolean;
}

function CustomDropdown({
  children,
  title,
  icon,
  className = "",
  contentClassName = "",
  closeOnOutsideClick = true,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!closeOnOutsideClick) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeOnOutsideClick]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-between bg-white p-4 rounded-xl w-full cursor-pointer ${className}`}
      >
        <div className="flex items-center gap-2">
          <span className={`${icon}`}></span>
          <span className="font-bold">{title}</span>
        </div>
        <span className="i-fluent:chevron-down-24-regular"></span>
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-between bg-white p-4 rounded-xl w-full cursor-pointer hover:bg-gray-50 transition-colors ${className}`}
        type="button"
      >
        <div className="flex items-center gap-2">
          <span className={`${icon} h-5 w-5`}></span>
          <span className="font-bold">{title}</span>
        </div>
        <span
          className={`i-fluent:chevron-down-24-regular transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden ${contentClassName}`}
        >
          <div className="p-6">{children}</div>
        </div>
      )}
    </div>
  );
}

export { CustomDropdown };
