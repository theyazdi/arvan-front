"use client";
import {
  AirplaneSearchMobile,
  AIFeaturesSearchMobile,
  HotelSearch,
} from "@/components/share/searchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function MobileSearchBar() {
  return (
    <div className="transition-all duration-1000 ease-in-out md:hidden block w-[380px] px-5">
      <Tabs
        defaultValue="Airplaine"
        className="w-full flex items-center flex-col "
      >
        <TabsList className="bg-white py-8 rounded-full w-full gap-2 overflow-x-auto overflow-y-hidden flex flex-row-reverse items-center justify-start px-4 scrollbar-hide">
          <TabsTrigger value="Airplaine" className="w-[136px] h-[45px]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">بلیط هواپیما</span>
              <span className="mt-1 i-fluent:airplane-24-regular"></span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="Stay" className="w-[136px] h-[45px]">
            <div className="flex items-center gap-2 ">
              <span className="text-sm font-medium">هتل و اقامتگاه</span>
              <span className="mt-1 i-fluent:building-24-regular"></span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="AIfeatures" className="w-[136px] h-[45px]">
            <div className="flex items-center gap-2 ">
              <span className="text-sm font-medium">بسته هوشمند</span>
              <span className="mt-1 i-fluent:sparkle-24-regular"></span>
            </div>
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 w-full">
          <TabsContent
            value="Airplaine"
            className="animate-in fade-in-50 slide-in-from-top-4 duration-900 ease-in-out w-full"
          >
            <div className="p-4 bg-white rounded-2xl">
              <AirplaneSearchMobile />
            </div>
          </TabsContent>
        </div>
        <div className=" w-full">
          <TabsContent
            value="Stay"
            className="animate-in fade-in-50 slide-in-from-top-4 duration-900 ease-in-out w-full"
          >
            <div className="p-4 bg-white rounded-2xl">
              <HotelSearch />
            </div>
          </TabsContent>
        </div>
        <div className="w-full">
          <TabsContent
            value="AIfeatures"
            className="animate-in fade-in-50 slide-in-from-top-4 duration-900 ease-in-out w-full"
          >
            <div className="p-4 bg-white rounded-2xl jus">
              <AIFeaturesSearchMobile />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export { MobileSearchBar };
