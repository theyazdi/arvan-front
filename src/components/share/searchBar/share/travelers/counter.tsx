import { Button } from "@/components/ui";
import { Add12Regular, Subtract12Regular } from "@fluentui/react-icons";

interface CounterProps {
  lable: string;
  subLable?: string;
  icon?: React.ReactNode;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  spacing?: "normal" | "wide";
}

function Counter({
  lable,
  subLable,
  count,
  onIncrement,
  onDecrement,
  spacing = "normal",
}: CounterProps) {
  const isWide = spacing === "wide";

  return (
    <div
      className={`flex items-center ${
        spacing === "wide"
          ? "justify-between gap-4 flex-row-reverse"
          : "justify-between"
      }`}
    >
      <div className="flex items-center gap-2 order-2 md:order-1">
        <Button
          size="sm"
          variant="outline"
          className={`rounded-full h-4 w-4 border-red-500`}
          onClick={onIncrement}
        >
          <Add12Regular className="w-4 h-4 text-red-500" />
        </Button>

        <p className="text-sm w-8 text-center">{count}</p>
        <Button
          size="sm"
          variant="outline"
          className={`rounded-full ${
            isWide ? "h-4 w-4" : "h-8 w-8"
          } flex items-center justify-center  border-red-500`}
          onClick={onDecrement}
        >
          <Subtract12Regular className="w-2 h-2 text-red-500" />
        </Button>
      </div>

      <div
        className={`${
          isWide ? "flex items-center gap-4" : "flex flex-col gap-2"
        } order-1 md:order-2`}
        dir="rtl"
      >
        <p className="font-semibold text-sm">{lable}</p>
        <p className="text-xs">({subLable})</p>
      </div>
    </div>
  );
}

export default Counter;
