import { TravelerRow } from "./travelerrow";
import { Passenger } from "./types";

function TravelerInfo({ traveler }: { traveler: Passenger }) {
  return (
    <div className="mt-2 bg-gray-1 px-7 py-6 rounded-xl flex flex-col gap-6">
      <div className="flex items-center justify-between ">
        <div className="flex-1">
          <TravelerRow
            icon="i-fluent:person-24-regular text-red-500"
            label="نام و نام خانوادگی"
            value={`${traveler.GivenName} ${traveler.SurName}`}
          />
        </div>
        <div className="flex-1">
          <TravelerRow
            icon="i-fluent:globe-person-24-regular text-red-500"
            label="کشور"
            value={traveler.Nationality}
          />
        </div>
      </div>

      <div className="flex items-center justify-between ">
        <div className="flex-1">
          <TravelerRow
            icon="i-fluent:calendar-date-24-regular text-red-500"
            label="تاریخ تولد"
            value={traveler.BirthDate}
          />
        </div>
        <div className="flex-1">
          <TravelerRow
            icon="i-fluent:person-24-regular text-red-500"
            label="جنسیت"
            value={traveler.Gender}
          />
        </div>
      </div>
    </div>
  );
}

export { TravelerInfo };
