import React from "react";
import { Airplane24Regular } from "@fluentui/react-icons";
import { Region } from "./location";
interface HeaderAirportSearchProps {
  data: Region;
  setLocation: (location: Region) => void;
}

function HeaderAirportSearch({ data, setLocation }: HeaderAirportSearchProps) {
  return (
    <div
      className="flex flex-col gap-2 items-center justify-center mt-4 cursor-pointer"
      onClick={() => setLocation(data)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Airplane24Regular />
          <p>{data.address.cityName}</p>
        </div>
        <p className="font-light">({data.iataCode}-All Airports)</p>
      </div>
      <p className="font-light">
        {data.address.cityName}, {data.address.countryName}
      </p>
    </div>
  );
}

export default HeaderAirportSearch;
