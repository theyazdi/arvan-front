import React from "react";
import { Visa } from "./visarequest";
import { Requestvisa, VisaPaymentInfo } from "@/app/dashboard/components";

interface VisatableProps {
  visList: Visa[];
  token: string;
  getData: () => void;
}

function Visatable({ visList, token, getData }: VisatableProps) {
  return (
    <div>
      <div className="flex items-center justify-between mt-14">
        <h3 className="text-2xl font-bold">درخواست ویزا</h3>
        <Requestvisa token={token} getData={getData} />
      </div>

      <div className="overflow-x-auto mt-14 border border-dashed rounded-xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="">
              {[
                "#",
                "نام مسافر",
                "جنسیت",
                "تاریخ تولد",
                "شماره پاسپورت",
                "نوع ویزا",
                "وضعیت",
                "حالت",
              ].map((th, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-sm font-bold text-right whitespace-nowrap"
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visList.map((visa, index) => {
              const statusColor =
                visa.state === "initial"
                  ? "text-yellow-500"
                  : visa.state === "لغو شده"
                  ? "text-red-600"
                  : visa.state === "completed"
                  ? "text-green-600"
                  : "text-gray-600";

              return (
                <tr key={index} className="align-center">
                  <td className="px-6 py-4 text-sm bg-white">{index + 1}</td>
                  <td colSpan={7} className="py-2 pl-6">
                    <div className="bg-gray-50 rounded-xl px-6 py-4 mt-2 flex flex-wrap items-center gap-y-2 ">
                      <div className="min-w-[158px] text-sm">
                        {visa.passport_first_name} {visa.passport_last_name}
                      </div>
                      <div className="min-w-[180px] text-sm">
                        {visa.sexuality}
                      </div>
                      <div className="min-w-[200px] text-sm">
                        {visa.birthday}
                      </div>
                      <div className="min-w-[190px] text-sm">
                        {visa.passport_number}
                      </div>
                      <div className="min-w-[180px] text-sm">
                        {visa.visa_type}
                      </div>
                      <div
                        className={`min-w-[140px] text-sm font-medium ${statusColor}`}
                      >
                        {visa.state}
                      </div>
                      <div className="text-sm">
                        <VisaPaymentInfo id={visa.id} token={token} />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Visatable };
