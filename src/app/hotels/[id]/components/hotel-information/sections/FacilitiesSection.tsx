"use client";

import { SectionHeader } from "../common/SectionHeader";

interface FacilityItemProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const FacilityItem: React.FC<FacilityItemProps> = ({ icon, title, items }) => (
  <div>
    <SectionHeader 
      icon={icon}
      title={title}
      className="text-gray-600"
    />
    <ul className="space-y-2 text-gray-600">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export const FacilitiesSection: React.FC = () => {
  const facilities = [
    {
      icon: <span className="i-fluent:home-24-regular w-5 h-5 text-gray-600"></span>,
      title: "Bathroom",
      items: [
        "Toilet paper",
        "Towels",
        "Private bathroom",
        "Toilet",
        "Free toiletries",
        "Hairdryer",
        "Shower"
      ]
    },
    {
      icon: <span className="i-fluent:tv-24-regular w-5 h-5 text-gray-600"></span>,
      title: "Living area",
      items: [
        "Desk",
        "Couch",
        "Flat-screen TV"
      ]
    },
    {
      icon: <span className="i-fluent:shield-lock-regular w-5 h-5 text-gray-600"></span>,
      title: "Safety & security",
      items: [
        "Fire extinguishers",
        "CCTV outside property",
        "CCTV in common areas",
        "Smoke alarms",
        "Security alarm",
        "Key card access",
        "Key access",
        "24-hour security",
        "Safety deposit box"
      ]
    },
    {
      icon: <span className="i-fluent:bed-24-regular w-5 h-5 text-gray-600"></span>,
      title: "Bedroom",
      items: [
        "Linen",
        "Extra long beds (>2 metres)"
      ]
    },
    {
      icon: <span className="i-fluent:food-24-regular w-5 h-5 text-gray-600"></span>,
      title: "Food & Drinks",
      items: [
        "Coffee house on site",
        "Snack bar",
        "Bar",
        "Wine/champagne"
      ]
    },
    {
      icon: <span className="i-fluent:accessibility-24-regular w-5 h-5 text-gray-600"></span>,
      title: "Accessibility",
      items: [
        "Upper floors accessible by elevator"
      ]
    },
    {
      icon: <span className="i-fluent:wifi-1-24-regular w-5 h-5 text-gray-600"></span>,
      title: "Internet",
      items: [
        "Free wi-fi"
      ]
    },
    {
      icon: <span className="i-fluent:vehicle-car-parking-24-regular w-5 h-5 text-gray-600"></span>,
      title: "Parking",
      items: [
        "Parking garage"
      ]
    },
    {
      icon: <span className="i-fluent:info-24-regular w-5 h-5 text-gray-600"></span>,
      title: "General",
      items: [
        "Hypoallergenic",
        "Air conditioning",
        "Non-smoking throughout",
        "Hardwood or parquet floors",
        "Heating",
        "Soundproofing",
        "Soundproof rooms",
        "Lift",
        "Non-smoking rooms",
        "Facilities for disabled guests"
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-6">
      {facilities.map((facility, index) => (
        <div key={index} className="space-y-3 md:space-y-8">
          <FacilityItem {...facility} />
        </div>
      ))}
    </div>
  );
}; 