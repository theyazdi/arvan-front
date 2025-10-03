function FlightBaggageRulesMobile() {
    return (
      <div className="mt-6 p-3 border border-[#E0E0E0] rounded-lg flex flex-col">
        <div className="flex items-center gap-2">
          <span className="i-fluent:luggage-24-regular h-5 w-5"></span>
          <span>قوانین بار</span>
        </div>
  
        {/* Cabin */}
        <div className="flex items-center gap-2 mt-3">
          <span className="font-medium">بار کابین</span>
          <p className="text-sm text-[#649651] font-bold">
            می‌توان با تعرفه‌های مختلف اضافه کرد
          </p>
        </div>
        <div className="flex items-start gap-2 mt-2 ">
          <span className="i-fluent:luggage-24-regular h-6 w-10"></span>
          <p className="text-sm">
            حمل ۱ آیتم کوچک (کیف دستی، کیف لپتاپ) تا ۵ کیلوگرم داخل کابین مجاز می
            باشد
          </p>
        </div>
  
        <hr className="my-2" />
  
        {/* Checked baggage */}
        <div className="flex items-center gap-2">
          <span className="font-medium">بار چمدان</span>
          <span className="text-sm font-bold text-[#649651]">شامل است</span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="i-fluent:luggage-24-regular h-6 w-6"></span>
              <span className="text-sm">کودک</span>
            </div>
            <p className="text-sm">۱ چمدان ۲۳ کیلوگرم</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="i-fluent:luggage-24-regular h-6 w-6"></span>
              <span className="text-sm">بزرگسال</span>
            </div>
            <p className="text-sm">۱ چمدان ۲۳ کیلوگرم</p>
          </div>
        </div>
      </div>
    );
  }
  
  export { FlightBaggageRulesMobile };
  