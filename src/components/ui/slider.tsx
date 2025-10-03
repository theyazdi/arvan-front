import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      variant: {
        basic: "text-black",
        gray: "text-gray-400",
      },
      type: {
        single: "h-2",
        double: "h-2",
      },
    },
    defaultVariants: {
      variant: "basic",
      type: "single",
    },
  }
);

export interface CustomSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {
  label?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  CustomSliderProps
>(({ className, variant, type, label, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-2 pb-4">
      {label && (
        <span className={cn(sliderVariants({ variant }))}>{label}</span>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(sliderVariants({ variant, type }), className)}
        {...props}
      >
        {/* White background track */}
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
          {/* Selected range Red */}
          <SliderPrimitive.Range
            className="absolute h-full"
            style={{ backgroundColor: "red" }}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-5 w-5 rounded-full border-2 transition-colors"
          style={{
            borderColor: variant === "basic" ? "red" : "white",
            backgroundColor: "red",
          }}
        />
        {type === "double" && (
          <SliderPrimitive.Thumb
            className="block h-5 w-5 rounded-full border-2 transition-colors"
            style={{
              borderColor: variant === "basic" ? "red" : "white",
              backgroundColor: "red",
            }}
          />
        )}
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = "CustomSlider";

export { Slider };