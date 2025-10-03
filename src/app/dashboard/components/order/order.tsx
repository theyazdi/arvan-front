import React from "react";
import { OrderTabBar } from "@/app/dashboard/components";

function Order({ token }: { token: string }) {
  return (
    <div className="mt-14">
      <h3 className="text-3xl font-medium">داشبورد</h3>
      <OrderTabBar token={token} />
    </div>
  );
}

export { Order };
