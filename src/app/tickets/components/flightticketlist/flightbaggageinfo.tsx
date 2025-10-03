interface FlightBaggageInfoProps {
  UnitOfMeasureQuantity : string
}

function FlightBaggageInfo({UnitOfMeasureQuantity} : FlightBaggageInfoProps) {
  return (
    <div>
      <p className="text-sm">بار: {UnitOfMeasureQuantity} کیلوگرم</p>
    </div>
  );
}

export {FlightBaggageInfo}