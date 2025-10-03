const statistics = [
  { value: "۲۴ ساعته", label: "پشتیبانی" },
  { value: "سابقه خدمت رسانی", label: "بیش از ۲۰ سال" },
  { value: "بیش از ۱۰۰ آژانس", label: "طرف قرار داد" },
  { value: "۲۴ ساعته", label: "پشتیبانی" },
];

export function ContactStats() {
  return (
    <section className="w-full flex flex-col items-center mb-10">
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between">
        {statistics.map((statistic, index) => (
          <div key={index} className="flex flex-col items-center flex-1 bg-gray-100 rounded-lg p-4 md:p-0 md:bg-transparent">
            <div className="text-sm md:text-lg font-bold mb-1 text-center">{statistic.value}</div>
            <div className="text-gray-600 text-xs md:text-base text-center">{statistic.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 