import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex items-center gap-2 rounded-lg border transition-all shadow-sm bg-white text-gray-700",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-gray-500 focus:ring-0 ",
        outline: "border border-gray-400 focus:ring-2 focus:ring-black",
        ghost: "border-transparent bg-transparent text-gray-700 focus:ring-0",
      },
      size: {
        sm: "h-10 px-3 text-sm",
        default: "h-12 px-4 text-base",
        lg: "h-14 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  errorMessage?: string | null;
  size?: "default" | "sm" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      leftIcon,
      rightIcon,
      variant,
      size,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-gray-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              inputVariants({ variant, size }),
              "w-full placeholder-gray-400 focus:outline-none outline-none",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-gray-400 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
