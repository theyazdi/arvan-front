import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TripTypeSelectorProps {
  tripType: "one-way" | "round-trip";
  setTripType: (tripType: string) => void;
}

function TripTypeSelector({
  tripType = "one-way",
  setTripType,
}: TripTypeSelectorProps) {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup
        type="single"
        value={tripType}
        onValueChange={(value) => value && setTripType(value)}
        className="border rounded-full p-1"
      >
        <ToggleGroupItem
          value="one-way"
          className="data-[state=on]:bg-gray-900 data-[state=on]:text-white data-[state=on]:pointer-events-none px-4 py-1 rounded-full text-xs font-light"
        >
          یک طرفه
        </ToggleGroupItem>
        <ToggleGroupItem
          value="round-trip"
          className="data-[state=on]:bg-gray-900 data-[state=on]:text-white data-[state=on]:pointer-events-none px-4 py-1 rounded-full text-xs font-light"
        >
          رفت و برگشت
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default TripTypeSelector;
