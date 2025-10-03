"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import { getAuthToken } from "@/lib/authToken";

interface Payment {
  invoice_id: string;
  created_at: string;
  order_type: string;
  amount: number;
  status: string;
  travelers: string[];
}

function Payment({ token }: { token: string }) {
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [error, setError] = useState<string>("");
  
  const getPayment = async () => {
    try {
      // Get auth token from localStorage or use passed token
      const authToken = getAuthToken() || token;
      
      if (!authToken) {
        setError("توکن احراز هویت یافت نشد");
        return;
      }
      
      const cleanToken = authToken.trim();
      const response = await fetch(`${API_BASE_URL}/payment/history`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setError(`خطا در دریافت اطلاعات: ${errorData.detail || response.statusText}`);
        return;
      }
      
      const data = await response.json();
      setPaymentList(data);
      setError("");
    } catch (err) {
      setError("خطا در ارتباط با سرور");
      console.error("Payment fetch error:", err);
    }
  };
  useEffect(() => {
    getPayment();
  }, [token]);
  return (
    <div className="mt-14">
      <h2 className="text-3xl font-medium">لیست پرداختی ها</h2>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
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
                          {payment.invoice_id}
                        </div>
                        <div className="min-w-[170px] text-sm ">
                          {new Date(payment.created_at).toLocaleDateString(
                            "fa-IR"
                          )}
                        </div>
                        <div className="min-w-[150Px] text-sm">
                          {payment.order_type === "flight" ? "هواپیما" : "هتل"}
                        </div>
                        <div className="min-w-[170px] text-sm">
                          {Number(payment.amount).toLocaleString()} تومان
                        </div>
                        <div className="min-w-[200px] text-sm text-center">
                          <div>{payment.travelers.length} نفر</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {payment.travelers.join("، ")}
                          </div>
                        </div>
                        <div
                          className={`min-w-[150px] text-sm font-medium text-center ${
                            payment.status === "verified"
                              ? "text-green-600"
                              : payment.status === "cancelled"
                              ? "text-red-600"
                              : "text-yellow-500"
                          }`}
                        >
                          {payment.status === "verified"
                            ? "خریداری شده"
                            : payment.status === "cancelled"
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
