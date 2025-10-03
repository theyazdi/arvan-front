"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useWizard } from "@/hooks";
import { useSearchParams } from "next/navigation";

export function HotelConfirmation() {
  const router = useRouter();
  const { data } = useWizard();
  const searchParams = useSearchParams();
  
  const hotelData = data.hotel;
  const passengers = data.passengers;
  
  const params = {
    check_in_date: searchParams.get("check_in_date") || "",
    check_out_date: searchParams.get("check_out_date") || "",
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleDownloadInvoice = () => {
    alert("فاکتور برای شما ارسال خواهد شد");
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <span className="i-fluent:checkmark-circle-24-filled w-12 h-12 text-green-600"></span>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">رزرو شما با موفقیت انجام شد!</h1>
          <p className="text-gray-600">شماره رزرو: <span className="font-semibold">HTL-{new Date().getFullYear()}-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span></p>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h2 className="font-semibold text-green-800 mb-4">اطلاعات رزرو:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">نام هتل:</span>
            <p className="font-semibold">{hotelData?.hotelName || "هتل انتخاب شده"}</p>
          </div>
          <div>
            <span className="text-gray-600">تاریخ ورود:</span>
            <p className="font-semibold">{params.check_in_date}</p>
          </div>
          <div>
            <span className="text-gray-600">تاریخ خروج:</span>
            <p className="font-semibold">{params.check_out_date}</p>
          </div>
          <div>
            <span className="text-gray-600">تعداد مهمان:</span>
            <p className="font-semibold">{hotelData?.adults || 1} بزرگسال{hotelData?.children ? `، ${hotelData.children} کودک` : ''}</p>
          </div>
          <div>
            <span className="text-gray-600">تعداد اتاق:</span>
            <p className="font-semibold">{hotelData?.rooms || 1} اتاق</p>
          </div>
          <div>
            <span className="text-gray-600">مسافر اصلی:</span>
            <p className="font-semibold">
              {passengers?.rooms?.[0]?.guests?.[0]?.firstName} {passengers?.rooms?.[0]?.guests?.[0]?.lastName}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="font-semibold text-blue-800 mb-4">مراحل بعدی:</h2>
        <ul className="text-sm text-blue-700 space-y-2 text-right">
          <li>• ایمیل تایید رزرو برای شما ارسال خواهد شد</li>
          <li>• اطلاعات ورود به هتل 24 ساعت قبل از تاریخ ورود ارسال می‌شود</li>
          <li>• در صورت نیاز به تغییر یا لغو، با پشتیبانی تماس بگیرید</li>
          <li>• شماره تماس پشتیبانی: 021-12345678</li>
        </ul>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="font-semibold text-yellow-800 mb-4">نکات مهم:</h2>
        <ul className="text-sm text-yellow-700 space-y-2 text-right">
          <li>• لطفا کارت شناسایی معتبر همراه داشته باشید</li>
          <li>• ساعت ورود: 14:00 - ساعت خروج: 12:00</li>
          <li>• در صورت تاخیر در ورود، لطفا با هتل تماس بگیرید</li>
        </ul>
      </div>

      <div className="flex justify-center space-x-4 space-x-reverse">
        <Button variant="outline" className="px-8" onClick={handleDownloadInvoice}>
          دانلود فاکتور
        </Button>
        <Button className="px-8" onClick={handleBackToHome}>
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  );
} 