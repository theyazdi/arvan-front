import React from "react";
import { TravelerRow } from "./travelerrow";
import { HotelInfo as HotelInfoType, Passenger } from "./types";
import Image from "next/image";
import Star from "../../../../../public/img/star.png";
import { Button } from "@/components/ui";

function HotelInfo({
  hotelInfo,
  passengers,
}: {
  hotelInfo: HotelInfoType;
  passengers: Passenger[];
}) {

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="i-fluent:receipt-sparkles-24-regular h-5 w-5"></span>
        <span className="text-lg font-bold"> اطلاعات رزرو</span>
      </div>
      <div className=" flex flex-col gap-6 bg-[#FAFAFA] rounded-xl py-6 px-8">
        <div className="flex items-center ">
          <div className="flex-1">
            <TravelerRow
              icon="i-fluent:calendar-reply-24-regular text-red-500"
              label="ورود"
              value={new Date(hotelInfo.CheckInDate).toLocaleDateString(
                "fa-IR"
              )}
            />
          </div>
          <div className="flex-1">
            <TravelerRow
              icon="i-fluent:calendar-arrow-right-24-regular text-red-500"
              label="خروج"
              value={new Date(hotelInfo.CheckOutDate).toLocaleDateString(
                "fa-IR"
              )}
            />
          </div>
        </div>
        <div className="flex items-center ">
          <div className="flex-1">
            <TravelerRow
              icon="i-fluent:bed-24-regular text-red-500"
              label="اتاق"
              value={hotelInfo.Residence.toString() + " اتاق خواب"}
            />
          </div>
          <div className="flex-1">
            <TravelerRow
              icon="i-fluent:person-24-regular text-red-500"
              label="مهمان"
              value={passengers[0].Gender}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="i-fluent:receipt-sparkles-24-regular h-5 w-5"></span>
        <span className="text-lg font-bold">اطلاعات اتاق</span>
      </div>
      <div className="flex flex-col gap-6 bg-[#FAFAFA] rounded-xl py-6 px-8">
        <div className="flex flex-col">
          <p className="text-2xl font-bold">{hotelInfo.HotelName}</p>
          <div className="flex items-center gap-2">
            <Image src={Star} alt="star" />
            <p className="text-sm text-gray-500">{hotelInfo.Rating} ستاره</p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full">
          <Button
            variant={"outline"}
            className="flex items-center gap-2 w-full"
          >
            <span className="i-fluent:arrow-up-right-24-regular"></span>
            برو به صفحه اصلی
          </Button>
          <Button
            variant={"outline"}
            className="flex items-center gap-2 w-full"
          >
            <span className="i-fluent:location-24-regular"></span>
            مشاهده روی نقشه
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">کینگ استودیو</p>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-[#212121] ">
              رزرو شده توسط :{passengers[0].SurName} {passengers[0].GivenName}{" "}
            </p>
            <div className="flex items-start gap-2">
              <div className="w-24 h-24 rounded-xl">
                <Image
                  src={hotelInfo.HotelPicture[0]}
                  width={96}
                  height={96}
                  alt="photo"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="i-fluent:bed-24-regular"></span>
                  <span className="text-sm font-medium">یک مبل راحتی</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="i-fluent:bed-24-regular"></span>
                  <span className="text-sm font-medium">یک تخت خواب بزرگ </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="i-fluent:dismiss-circle-24-regular"></span>
                  <span className="text-sm font-medium">
                    امکان کنسلی قبل از ساعت ۱۶:۰۰ در ۷ فروردین ۱۴۰۳{" "}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="i-fluent:money-24-regular"></span>
                  <span className="text-sm font-medium">
                    امکان پرداخت در محل
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant={"outline"} className="rounded-lg w-4/12 ">
            مشاهده همه سرویس ها
          </Button>
        </div>
      </div>
    </div>
  );
}

export { HotelInfo };
