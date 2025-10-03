import { Location24Regular } from "@fluentui/react-icons";
import { HotelRegion } from "./from"; // <-- hotel type

interface CityNameHotelProps {
  data: HotelRegion[];
  setLocation: (location: HotelRegion) => void;
}

function CityNameHotel({ data, setLocation }: CityNameHotelProps) {
  return (
    <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto">
      {data.map((city, index) => (
        <div
          key={index}
          className="flex flex-row-reverse gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          onClick={() => setLocation(city)}
        >
          <div className="flex items-center gap-3">
            <Location24Regular className="text-gray-500" />
            <div>
              <p className="font-semibold text-sm">{city.cityNameFa}</p>
              <p className="text-sm font-light">{city.countryNameFa}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CityNameHotel;
