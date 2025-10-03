import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useVisa } from "@/hooks";

function PassportList() {
  const { visaRequests, setSelectedPassenger } = useVisa();

  const handleSelect = (id: string) => {
    const selected = visaRequests.find((p) => p.id.toString() === id);
    setSelectedPassenger(selected);
  };

  return (
    <div className="flex flex-col gap-4 mt-3">
      <RadioGroup onValueChange={handleSelect}>
        {visaRequests.map((passenger) => (
          <div
            key={passenger.id}
            className="p-3 border border-gray-300 rounded-xl flex items-start gap-4"
          >
            <RadioGroupItem
              value={passenger.id.toString()}
              id={`passenger-${passenger.id}`}
              className="mt-1"
            />
            <div className="w-full" dir="rtl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{passenger.passanger_first_name} {passenger.passanger_last_name}</h3>
                <p className="text-sm">{passenger.sexuality}</p>
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">شماره پاسپورت</h3>
                  <p className="text-sm text-gray-500">
                    {passenger.passport_number}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">تاریخ تولد</h3>
                  <p className="text-sm text-gray-500">{passenger.birthday}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export { PassportList };
