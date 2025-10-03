import { Button } from "@/components/ui";

const divider = <div className="w-px h-5 bg-gray-300"></div>;

function FlightActions() {
  return (
    <div className="flex items-center gap-5">
      <Button variant="ghost">جزئیات پرواز</Button>
      {divider}
      <Button variant="ghost">قوانین استرداد</Button>
      {divider}
      <Button variant="ghost">قوانین ویزا و مسیر</Button>
      {divider}
      <Button variant="ghost">قوانین بار</Button>
      {divider}
      <Button variant="ghost">جزئیات قیمت</Button>
    </div>
  );
}

export {FlightActions}
