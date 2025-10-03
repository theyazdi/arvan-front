import { Region, Region as LocationType } from "../share/location/location";
import { ArrowDown16Regular, ArrowUp16Regular } from "@fluentui/react-icons";
import { useWizard } from "@/hooks";
import TripTypeSelector from "./tripTypeSelector";
import StepContainer from "./stepContainer";
import { LocationMobile } from "../share/location/locationmobile";

function FightSearchBar() {
  const { data, setStepData } = useWizard();
  return (
    <StepContainer title="کجا میروید؟">
      <div className="md:flex hidden items-center  gap-30">
        <Region
          title="انتخاب مبدا"
          icon={<ArrowUp16Regular />}
          setLocation={(location: string) => setStepData("from", location)}
          location={data.from}
          selectedLocation={data.fromLocation}
          setSelectedLocation={(location: LocationType | null) =>
            setStepData("fromLocation", location)
          }
          setIsCity={(isCity: boolean) => setStepData("fromIsCity", isCity)}
        />

        <Region
          title="انتخاب مقصد"
          icon={<ArrowDown16Regular />}
          setLocation={(location: string) => setStepData("to", location)}
          location={data.to}
          selectedLocation={data.toLocation}
          setSelectedLocation={(location: LocationType | null) =>
            setStepData("toLocation", location)
          }
          setIsCity={(isCity: boolean) => setStepData("toIsCity", isCity)}
        />
        <TripTypeSelector
          tripType={data.tripType || "one-way"}
          setTripType={(tripType: string) =>
            setStepData("tripType", tripType as "one-way" | "round-trip")
          }
        />
      </div>
      <div className="md:hidden flex flex-col gap-4">
        <LocationMobile
          title="انتخاب مبدا"
          icon={<ArrowUp16Regular />}
          setLocation={(location: string) => setStepData("from", location)}
          location={data.from}
          selectedLocation={data.fromLocation}
          setSelectedLocation={(location: LocationType | null) =>
            setStepData("fromLocation", location)
          }
          setIsCity={(isCity: boolean) => setStepData("fromIsCity", isCity)}
        />
        <LocationMobile
          title="انتخاب مقصد"
          icon={<ArrowDown16Regular />}
          setLocation={(location: string) => setStepData("to", location)}
          location={data.to}
          selectedLocation={data.toLocation}
          setSelectedLocation={(location: LocationType | null) =>
            setStepData("toLocation", location)
          }
          setIsCity={(isCity: boolean) => setStepData("toIsCity", isCity)}
        />
        <hr />
          <p className="text-sm text-gray-500">سفر یک طرفه میخواهید یا رفت و برگشت؟</p>
        <TripTypeSelector
          tripType={data.tripType || "one-way"}
          setTripType={(tripType: string) =>
            setStepData("tripType", tripType as "one-way" | "round-trip")
          }
        />
      </div>
    </StepContainer>
  );
}

export default FightSearchBar;
