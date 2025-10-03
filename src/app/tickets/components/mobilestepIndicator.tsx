function MobileStepIndicator({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) {
  return (
    <div className="md:hidden mt-8 flex items-center mx-5 gap-2">
      <div className="flex items-center gap-2 bg-[#33363B] rounded-full py-2 px-3">
        <span className="i-fluent:circle-24-regular h-3 w-3 text-white"></span>
        <span className="text-white text-xs">قدم اول</span>
      </div>
      <p className="text-sm font-bold">
        انتخاب پرواز رفت از {origin} به {destination}
      </p>
    </div>
  );
}

export { MobileStepIndicator };
