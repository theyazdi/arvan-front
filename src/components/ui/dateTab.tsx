"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calendar } from "../ui";

export interface DatePickerProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  title: string;
  icon: React.JSX.Element;
}
function DateTab({ date, setDate }: DatePickerProps) {
  return (
    <Tabs defaultValue="exact" className="flex flex-col items-center mt-2">
      <TabsList className="flex gap-3 bg-transparent border rounded-2xl w-[270px] items-center py-1">
        <TabsTrigger
          value="exact"
          className="cursor-pointer px-4 py-2 rounded-full transition-all duration-200 data-[state=active]:bg-[#3759b3]"
        >
          <Label htmlFor="exact" className="cursor-pointer">
            Exact Time
          </Label>
        </TabsTrigger>
        <TabsTrigger
          value="around"
          className="cursor-pointer px-4 py-2 rounded-full transition-all duration-200 data-[state=active]:bg-[#116b6b]"
        >
          <Label htmlFor="around" className="cursor-pointer">
            Around Time
          </Label>
        </TabsTrigger>
      </TabsList>
      <hr className="w-full border-gray-300 border-t mt-4" />
      <div className="w-full  flex justify-center">
        <TabsContent value="exact">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border-none"
          />
        </TabsContent>

        <TabsContent value="around">
          <h2 className="text-xl font-bold">Around Time Content</h2>
        </TabsContent>
      </div>
    </Tabs>
  );
}

export { DateTab };
