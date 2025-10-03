"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWizard } from "@/hooks";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { formatPriceWithToman } from "@/lib/price";

interface HotelPaymentFormProps {
  onSubmit: () => void;
  hotelData?: any;
  selectedRoom?: any;
  adults?: number;
  children?: number;
  rooms?: number;
}

export function HotelPaymentForm({ 
  onSubmit, 
  hotelData, 
  selectedRoom, 
  adults = 1, 
  children = 0, 
  rooms = 1 
}: HotelPaymentFormProps) {
  const { data, prevStep } = useWizard();
  const [selectedPayment, setSelectedPayment] = useState("بانک سامان");
  const [discountCode, setDiscountCode] = useState("");
  const searchParams = useSearchParams();

  const passengers = data.passengers;
  
  const params = {
    city: searchParams.get("city") || "",
    check_in_date: searchParams.get("check_in_date") || "",
    check_out_date: searchParams.get("check_out_date") || "",
  };

  const calculateNights = () => {
    if (!params.check_in_date || !params.check_out_date) return 1;
    const checkIn = new Date(params.check_in_date);
    const checkOut = new Date(params.check_out_date);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const pricePerNight = selectedRoom ? Number(selectedRoom.price.total) : 0;
  const serviceFee = selectedRoom?.price?.serviceFee ? Number(selectedRoom.price.serviceFee) : 0;
  const discount = selectedRoom?.price?.discount ? Number(selectedRoom.price.discount) : 0;
  const total = (pricePerNight * nights) + serviceFee - discount;

  return (
    <div className="flex flex-col gap-8">
      {/* Mobile Design - Like Sidebar */}
      <div className="md:hidden flex flex-col gap-6" dir="rtl">
        {/* Hotel Info Card */}
        <div className="bg-[#FAFAFA] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col flex-1">
              <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <span className="i-fluent:calendar-ltr-24-regular w-6 h-6 text-red-500"></span> ورود
              </span>
              <span className="text-sm font-bold">{params.check_in_date}</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <span className="i-fluent:calendar-ltr-24-regular w-6 h-6 text-red-500"></span> خروج
              </span>
              <span className="text-sm font-bold">{params.check_out_date}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col flex-1">
              <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <span className="i-fluent:bed-24-regular w-6 h-6 text-red-500"></span> اتاق
              </span>
              <span className="text-sm font-bold">{selectedRoom?.name || 'اتاق انتخاب نشده'}</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <span className="i-fluent:people-24-regular w-6 h-6 text-red-500"></span> مهمان
              </span>
              <span className="text-sm font-bold">{adults} بزرگسال{children ? `، ${children} کودک` : ''}</span>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-base font-bold mb-4">قیمت</div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">{nights} شب</span>
            <span className="text-sm">{formatPriceWithToman(pricePerNight * nights)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">هزینه سرویس</span>
            <span className="text-sm">{formatPriceWithToman(serviceFee)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">تخفیف</span>
            <span className="text-sm">{formatPriceWithToman(discount)}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold">جمع کل</span>
            <span className="text-lg font-bold">{formatPriceWithToman(total)}</span>
          </div>
        </div>

        {/* Discount Code Input */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex gap-3">
            <Input
              placeholder="کد تخفیف"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200"
              size="sm"
              onClick={() => {
                if (discountCode.trim()) {
                  alert(`کد تخفیف ${discountCode} اعمال شد`);
                } else {
                  alert("لطفا کد تخفیف را وارد کنید");
                }
              }}
            >
              اعمال
            </Button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="i-fluent:money-24-regular w-6 h-6 text-red-500"></span>
            <h4 className="text-xl font-bold">روش های پرداخت</h4>
          </div>
          
          <RadioGroup
            value={selectedPayment}
            onValueChange={setSelectedPayment}
            className="flex flex-col space-y-4"
            dir="rtl"
          >
            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
              <RadioGroupItem value="account" id="account" className="text-pink-500" />
              <div className="flex-1">
                <Label htmlFor="account" className="text-sm font-medium">
                  برداشت از موجودی حساب کاربری
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  موجودی: 0 تومان - در صورت لغو رزرو، مبلغ به حساب شما بازگردانده می‌شود
                </p>
              </div>
              <span className="text-sm font-bold">0 تومان</span>
            </div>
            
            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
              <RadioGroupItem value="بانک سامان" id="saman" className="text-pink-500" />
              <Label htmlFor="saman" className="text-sm font-medium flex-1">
                درگاه بانک سامان
              </Label>
            </div>
            
            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
              <RadioGroupItem value="بانک ملی" id="meli" className="text-pink-500" />
              <Label htmlFor="meli" className="text-sm font-medium flex-1">
                درگاه بانک ملی
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button 
          className="w-full py-4 text-base bg-black text-white rounded-xl font-bold hover:bg-black/90 transition"
          onClick={onSubmit}
        >
          تایید و ادامه خرید
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          با کلیک بر روی دکمه تایید و مشاهده ی فاکتور به منزله ی مطالعه <span className="text-red-500">قوانین</span> و <span className="text-red-500">مقررات</span> و اطمینان از درستی اطلاعات وارد شده میباشد.
        </p>
      </div>

      {/* Desktop Design - Original */}
      <div className="hidden md:flex flex-col gap-8">
        {/* First Box - Passenger Information */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">اطلاعات مسافرها</h3>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-2xl p-4"
              onClick={prevStep}
            >
              <span className="i-fluent:edit-24-regular"></span>
              تغییر اطلاعات
            </Button>
          </div>

          {/* Passenger Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {passengers?.rooms?.map((room: any, roomIndex: number) => (
              room.guests.map((guest: any, guestIndex: number) => (
                <div key={`${roomIndex}-${guestIndex}`} className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="i-fluent:person-24-regular w-5 h-5 text-red-500"></span>
                    <h4 className="text-lg font-bold">
                      {guestIndex === 0 ? "بزرگسال اول" : 
                       guestIndex === 1 ? "بزرگسال دوم" : "خردسال"}
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">نام در گذرنامه:</span>
                      <span className="font-medium">{guest.passportName || ""}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">نام خانوادگی در گذرنامه:</span>
                      <span className="font-medium">{guest.passportFamilyName || ""}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">جنسیت:</span>
                      <span className="font-medium">{guest.gender === "MALE" ? "مرد" : "زن"}</span>
                    </div>
                    {guest.nationalCode && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">کد ملی:</span>
                        <span className="font-medium">{guest.nationalCode}</span>
                      </div>
                    )}
                    {guest.passportNumber && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">شماره پاسپورت:</span>
                        <span className="font-medium">{guest.passportNumber}</span>
                      </div>
                    )}
                    {guest.phone && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">شماره تماس:</span>
                        <span className="font-medium">{guest.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>

        {/* Second Box - Essential Notes */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="i-fluent:info-24-regular w-6 h-6 text-blue-600"></span>
            <h3 className="text-xl font-bold">نکات ضروری</h3>
          </div>
          
          <div className="text-gray-700 leading-relaxed text-sm">
            <p className="mb-3">
              هتل برلین میته که در قلب برلین قرار دارد، ترکیبی عالی از راحتی مدرن و جذابیت تاریخی را ارائه می دهد. این هتل شیک از نظر استراتژیک فقط در فاصله کوتاهی از مکان‌های دیدنی نمادین مانند دروازه براندنبورگ، جزیره موزه و بلوار پرجنب‌وجوش Unter den Linden قرار دارد.
            </p>
            
            <p className="mb-3">
              این هتل دارای اتاق‌هایی با طراحی زیبا است که هم برای مسافران تفریحی و هم برای مسافران تجاری، مجهز به رختخواب‌های مجلل، مبلمان مدرن، و امکانات مدرن از جمله Wi-Fi رایگان، تلویزیون صفحه‌تخت، و مینی‌بار است. بسیاری از اتاق‌ها چشم‌انداز خیره‌کننده‌ای از خط افق برلین یا باغ‌های آرام اطراف دارند.
            </p>
            
            <p className="mb-3">
              میهمانان می توانند روز خود را با صبحانه بوفه خوشمزه با انواع غذاهای محلی و بین المللی در فضای ناهار خوری روشن و دلباز شروع کنند. بار هتل مجموعه‌ای از شراب‌ها، کوکتل‌ها و آبجوهای دست‌ساز محلی را سرو می‌کند که برای استراحت پس از یک روز گشت و گذار در شهر عالی است.
            </p>
            
            <p className="mb-3">
              هتل برلین میته برای کسانی که به صورت کاری سفر می کنند، اتاق های ملاقات کاملاً مجهز و یک مرکز تجاری را فراهم می کند که اطمینان حاصل می کند که تمام نیازهای حرفه ای برآورده شده است. کارکنان خوش برخورد و آگاه همیشه برای کمک به رزرو تور، ترتیبات حمل و نقل یا هر درخواست خاصی آماده هستند.
            </p>
            
            <p>
              هتل برلین میته با موقعیت عالی، اقامتگاه های مجلل و خدمات استثنایی، پایگاه ایده آلی برای تجربه فرهنگ و تاریخ پر جنب و جوش پایتخت آلمان است. چه برای گشت و گذار، خرید و یا تجارت اینجا هستید، این هتل اقامتی فراموش نشدنی در برلین را نوید می دهد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}