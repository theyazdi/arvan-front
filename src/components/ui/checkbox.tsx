import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const checkboxVariants = cva("flex items-center space-x-2 cursor-pointer", {
  variants: {
    variant: {
      basic: "text-black",
      gray: "text-gray-300",
    },
  },
  defaultVariants: {
    variant: "basic",
  },
});

export interface CheckboxProps {
  label: string;
  variant?: "basic" | "gray";
}

const Checkbox: React.FC<CheckboxProps> = ({ label, variant = "basic" }) => {
  return (
    <label className={cn(checkboxVariants({ variant }))}>
      <CheckboxPrimitive.Root
        className="relative w-4 h-4  rounded-full transition-all focus:outline-none"
        style={{
          borderColor: "red",
          backgroundColor: variant === "basic" ? "#FBDAD9" : "black", // Variable background
        }}
      >
        <CheckboxPrimitive.Indicator className="absolute inset-0 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="red">
            <path d="M20.285 5.285a1.5 1.5 0 0 0-2.12 0l-8.96 8.96-3.96-3.96a1.5 1.5 0 0 0-2.12 2.12l5 5a1.5 1.5 0 0 0 2.12 0l10-10a1.5 1.5 0 0 0 0-2.12z" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{label}</span>
    </label>
  );
};

export { Checkbox };
