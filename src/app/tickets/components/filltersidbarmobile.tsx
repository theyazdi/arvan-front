import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui";
import { PriceFilter } from "./pricefilter";
import { StopFilter } from "./stopfilter";
import { DurationFilter } from "./durationfilter";
import { AirllineFilter } from "./airlinesfilter";
import { FilterSidebarProps } from "./filtersidebar";


function Filltersidbarmobile({
  price,
  setPrice,
  duration,
  setDuration,
  selectedAirlines,
  setSelectedAirlines,
  stopFilter,
  setStopFilter,
  open,
  setOpen,
}: FilterSidebarProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button variant={"outline"} className="flex items-center gap-2">
        <span className="i-fluent:filter-24-regular"></span>
        فیلتر ها
      </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-medium flex items-center gap-2">
            <span className="i-fluent:filter-24-regular h-6 w-6"></span>
            فیلتر ها
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-6">
          <PriceFilter price={price} setPrice={setPrice} />
          <hr className="mt-6" />
          <StopFilter stopFilter={stopFilter} setStopFilter={setStopFilter} />
          <hr className="mt-6" />
          <DurationFilter duration={duration} setDuration={setDuration} />
          <hr className="mt-6" />
          <AirllineFilter
            selectedAirlines={selectedAirlines}
            setSelectedAirlines={setSelectedAirlines}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { Filltersidbarmobile };
