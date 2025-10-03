interface FlightExtraInfoProps {
    unitOfMeasureQuantity: string;
  }
  
  function FlightExtraInfoMobile({ unitOfMeasureQuantity }: FlightExtraInfoProps) {
    return (
      <>
        <hr className="my-3"/>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">کلاس پرواز</span>
            <span className="text-sm text-[#757575]">Economy</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium"> بار مجاز</span>
            <span className="text-sm text-[#757575]">
              {unitOfMeasureQuantity} کیلوگرم
            </span>
          </div>
        </div>
      </>
    );
  }
  
  export { FlightExtraInfoMobile };
  