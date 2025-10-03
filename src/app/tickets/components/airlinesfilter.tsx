"use client";
import { Button } from "@/components/ui";
import { useState } from "react";
import { airline } from "./ticketswithparams";

interface AirllineFilterProps {
  selectedAirlines: string[];
  setSelectedAirlines: (value: string[]) => void;
}

function AirllineFilter({
  selectedAirlines,
  setSelectedAirlines,
}: AirllineFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleAirline = (airlineCode: string) => {
    if (selectedAirlines.includes(airlineCode)) {
      // Remove airline if already selected
      setSelectedAirlines(selectedAirlines.filter(code => code !== airlineCode));
    } else {
      // Add airline if not selected
      setSelectedAirlines([...selectedAirlines, airlineCode]);
    }
  };

  return (
    <div>
      <Button
        variant={"link"}
        className="flex items-center justify-between w-full p-0"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <span className="i-fluent:airplane-24-regular"></span>
          <span className="text-sm font-medium">خط هوایی</span>
        </div>
        <span
          className={`i-fluent:chevron-up-24-regular transition-transform duration-500 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        ></span>
      </Button>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          open ? "max-h-100" : "max-h-0"
        }`}
      >
        <div
          className={`transition-all duration-500 mt-2 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          {airline.map((air, index) => (
            <div className="flex flex-col gap-2 mt-1" key={index}>
              <Button
                variant="ghost"
                className={
                  selectedAirlines.includes(air.code) ? "bg-gray-3" : ""
                }
                onClick={() => toggleAirline(air.code)}
              >
                <div className="flex items-center gap-2 w-full">
                  <span
                    className={`i-fluent:checkmark-24-regular ${
                      selectedAirlines.includes(air.code) ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-200`}
                  ></span>
                  {air.name}
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { AirllineFilter };
