import React from "react";
import { PassportInfo } from "./pasportinfo";
import { DeletePassportInfo } from "./deletepassportinfo";
import { EditPassportInfo } from "./editpassportinfo";

interface PassportTabelProps {
  passportData: PassportInfo[];
  token: string;
  getData: () => void;
}

function PassportTabel({ passportData, token, getData }: PassportTabelProps) {
  return (
    <div className="mt-14">
      <h3 className="text-2xl font-bold text-right mb-6">اطلاعات پاسپورت</h3>

      <div className="overflow-x-auto mt-6 border border-dashed rounded-xl">
        <table className="min-w-full bg-white text-right">
          <thead>
            <tr>
              {[
                "#",
                "نام مسافر",
                "جنسیت",
                "تاریخ تولد",
                "شماره پاسپورت",
                "تاریخ انقضا",
                "کشور",
                "عملیات",
              ].map((title, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-sm font-bold whitespace-nowrap"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {passportData.map((passport, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm">{index + 1}</td>
                <td colSpan={7} className="py-2 pl-6">
                  <div className="bg-gray-50 rounded-xl px-6 py-4 mt-2 flex flex-wrap items-center gap-4">
                    <div className="w-[180px] text-sm truncate">
                      {passport.passanger_first_name} {passport.passanger_last_name}
                    </div>
                    <div className="w-[100px] text-sm truncate">
                      {passport.sexuality}
                    </div>
                    <div className="w-[150px] text-sm truncate">
                      {passport.birthday}
                    </div>
                    <div className="w-[180px] text-sm truncate">
                      {passport.passport_number}
                    </div>
                    <div className="w-[120px] text-sm truncate">
                      {passport.passport_expiration_date}
                    </div>
                    <div className="w-[90px] text-sm truncate text-gray-600">
                      {passport.passport_country}
                    </div>
                    <div className="w-[170px] flex gap-2">
                      <DeletePassportInfo
                        id={passport.id}
                        token={token}
                        getData={getData}
                      />
                      <EditPassportInfo
                        id={passport.id}
                        token={token}
                        getData={getData}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { PassportTabel };
