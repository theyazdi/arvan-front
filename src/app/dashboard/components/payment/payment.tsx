"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/fetch";
import { Button } from "@/components/ui/button";

interface Payment {
  amount: number;
  created_at: string;
  id: number;
  tracking_code: string;
  status: number;
  order_type: number;
  number_of_travelers: number;
}

function Payment({ token }: { token: string }) {
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const getPayment = async () => {
    const response = await fetch(`${API_BASE_URL}/panel/payment/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setPaymentList(data);
  };
  useEffect(() => {
    getPayment();
  }, [token]);
  return (
    <div className="mt-14">
      <h2 className="text-3xl font-medium">لیست پرداختی ها</h2>
      <div className="mt-8 bg-white rounded-lg p-4">
        <div className="overflow-x-auto mt-14 border border-dashed rounded-xl">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="">
                {[
                  "#",
                  "شماره رزرو",
                  "تاریخ",
                  "نوع بلیط",
                  "مبلغ پرداخت شده",
                  "مسافران",
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
              {paymentList.map((payment, index) => {
                return (
                  <tr key={index} className="align-center">
                    <td className="px-6 py-4 text-sm bg-white">{index + 1}</td>
                    <td colSpan={7} className="py-2 pl-6">
                      <div className="bg-gray-50 rounded-xl px-6 py-4 mt-2 flex flex-wrap items-center gap-y-2 ">
                        <div className="min-w-[138px] text-sm">
                          {payment.tracking_code}
                        </div>
                        <div className="min-w-[170px] text-sm ">
                          {new Date(payment.created_at).toLocaleDateString(
                            "fa-IR"
                          )}
                        </div>
                        <div className="min-w-[150Px] text-sm">
                          {payment.order_type === 1 ? "هواپیما" : "هتل"}
                        </div>
                        <div className="min-w-[170px] text-sm">
                          {Number(payment.amount).toLocaleString()} تومان
                        </div>
                        <div className="min-w-[200px] text-sm text-center">
                          {payment.number_of_travelers} نفر
                        </div>
                        <div
                          className={`min-w-[150px] text-sm font-medium text-center ${
                            payment.status.toString() === "2"
                              ? "text-green-600"
                              : payment.status.toString() === "3"
                              ? "text-red-600"
                              : "text-yellow-500"
                          }`}
                        >
                          {payment.status === 2
                            ? "خریداری شده"
                            : payment.status === 3
                            ? "لغو شده"
                            : "درحال پرداخت"}
                        </div>
                        <div className="text-sm min-w-[60px] text-center mx-auto">
                          <Button size={"icon"}>
                            <span className="i-fluent:eye-24-regular"></span>
                          </Button>
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
    </div>
  );
}

export { Payment };
