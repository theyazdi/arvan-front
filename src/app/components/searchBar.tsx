"use client";
//Todo: refactor this component to server action
import {
  AiSearch,
  AirplaneSearch,
  HotelSearch,
} from "@/components/share/searchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SearchBar() {
  return (
    <div className="transition-all duration-1000 ease-in-out w-full md:block hidden ">
      <Tabs
        defaultValue="Airplaine"
        className="w-full flex items-center flex-col "
      >
        <TabsList className="bg-white px-4 py-10 rounded-full">
          <TabsTrigger value="Stay" className="w-[194px] h-[45px]">
            <div className="flex items-center gap-2 ">
              <span>هتل و اقامتگاه</span>
              <span className="mt-1 i-fluent:building-24-regular h-6 w-6"></span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="AIfeatures" className="w-[194px] h-[45px]">
            <div className="flex items-center gap-2">
              <span>بسته هوشمند</span>
              <span className="mt-1 i-fluent:sparkle-24-regular h-6 w-6"></span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="Airplaine" className="w-[194px] h-[45px]">
            <div className="flex items-center gap-2">
              <span>بلیط هواپیما</span>
              <span className="mt-1 i-fluent:airplane-24-regular h-6 w-6"></span>
            </div>
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 w-full">
          <TabsContent
            value="Airplaine"
            className="animate-in fade-in-50 slide-in-from-right-4 duration-700 ease-in-out w-full"
          >
            <AirplaneSearch />
          </TabsContent>
          <TabsContent
            value="Stay"
            className="animate-in fade-in-50 slide-in-from-right-4 duration-700 ease-in-out w-full"
          >
            <HotelSearch />
          </TabsContent>
          <TabsContent
            value="AIfeatures"
            className="animate-in fade-in-50 slide-in-from-right-4 duration-700 ease-in-out w-full"
          >
            <AiSearch />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default SearchBar;
