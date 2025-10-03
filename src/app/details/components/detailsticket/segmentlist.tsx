import { FlightSegment } from "../../page";
import { SegmentItem } from "./segmentitem";
import React from "react";

interface Props {
  segments: FlightSegment[];
  airlineNameFa: string;
  flightNumber: string;
}

export function SegmentList({ segments, airlineNameFa, flightNumber }: Props) {
  return (
    <div className="flex flex-col  mt-8">
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <SegmentItem
            segment={segment}
            airlineNameFa={airlineNameFa}
            flightNumber={flightNumber}
            showVerticalBorder={index !== segments.length - 1}
            isFirst={index === 0}
            isLast={index === segments.length - 1}
          />
        </React.Fragment>
      ))}
      <div className="w-full h-px bg-gray-3 my-3"></div>
      <div>
        <h3 className="font-medium">
          بار چمدان <span className="text-green-5">شامل است </span>
        </h3>
        <div className="flex items-center mt-2 gap-20">
          <div className="flex items-start gap-2">
            <span className="i-fluent:luggage-24-regular h-6 w-6"></span>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm">بزرگسال</h4>
              <span className="text-sm">۱ چمدان ۲۳ کیلوگرم</span>
            </div>
          </div>
          <div className="w-px h-22 bg-gray-3"></div>
          <div className="flex items-start gap-2">
            <span className="i-fluent:luggage-24-regular h-6 w-6"></span>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm">کودک</h4>
              <span className="text-sm">۲ چمدان ۲۳ کیلوگرم</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <h3 className="font-medium">بار کابین</h3>
          <p className="text-green-5 text-sm">
            می‌توان با تعرفه‌های مختلف اضافه کرد
          </p>
        </div>
        <div className="flex items-center mt-2 gap-2">
          <span className="i-fluent:luggage-24-regular h-6 w-6"></span>
          <p className="text-sm">
            حمل ۱ آیتم کوچک (کیف دستی، کیف لپتاپ) تا ۵ کیلوگرم داخل کابین مجاز
            می باشد
          </p>
        </div>
      </div>
    </div>
  );
}
