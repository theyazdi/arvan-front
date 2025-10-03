"use client";

interface TravellersInfoProps {
  adults: string | null;
}

function TravellersInfo({ adults }: TravellersInfoProps) {
  return (
    <div className="flex items-start gap-2">
      <span className="i-fluent:person-24-regular text-[#9EA8C3]"></span>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold">مسافران</span>
        <div className="flex items-center gap-2 text-xs text-[#757575]">
          <p>{adults} بزرگسال</p>
        </div>
      </div>
    </div>
  );
}

export { TravellersInfo };