import React from 'react'

function MobilePriceCalendar() {
  return (
    <div className="md:hidden flex items-center justify-between mx-5 bg-white rounded-xl px-4 py-2 mt-6">
        <div className="flex items-center gap-2">
          <span className="i-fluent:calendar-ltr-24-regular h-5 w-5 text-[#252525]"></span>
          <p className="text-sm font-medium text-[#33363B]">تقویم قیمت</p>
        </div>
        <p className="text-[#33363B] font-300 text-xs">برای پرواز رفت</p>
      </div>
  )
}

export { MobilePriceCalendar };