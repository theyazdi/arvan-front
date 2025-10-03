import React, { JSX } from "react";
import { PlannerCard } from "@/app/components";
import Altravel from "../../../../public/img/AI icon - based on budget.svg";
import Planner from "../../../../public/img/AI icon - Planner.svg";

interface TabContentProps {
  visibleTabs: string[];
  selectedTab: string;
}

const cardData = [
  {
    id: "Trip Planner",
    image: Altravel,
    backgroundImage: "./img/25524e6e32417a2beb22d3ed03702b18.jpg",
    title: "برنامه ریزی شخصی برای سفر",
    description:
      "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده نیاز به متن های تستی و آزمایشی دارند و از آنجایی که تایپ متن های آزمایشی می تواند زمان بسیار زیادی از طراح بگیرد و زمان را هدر بدهد.",
    features: [
      {
        icon: (
          <span className="i-fluent:slide-text-sparkle-24-regular text-xl"></span>
        ),
        title: "تایتل عنوان",
        description:
          "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده.",
      },
      {
        icon: <span className="i-fluent:location-24-filled text-xl"></span>,
        title: "تایتل عنوان",
        description:
          "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده.",
      },
      {
        icon: <span className="i-fluent:diamond-24-filled text-xl"></span>,
        title: "تایتل عنوان",
        description:
          "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده.",
      },
    ],
  },
  {
    id: "Travelling on a Budget",
    image: Planner,
    backgroundImage: "./img/e5dec6adcd8569cf3ebc851283ee5dd8.jpg",
    title: "سفر بر اساس بودجه مورد نظر",
    description:
      "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده نیاز به متن های تستی و آزمایشی دارند و از آنجایی که تایپ متن های آزمایشی می تواند زمان بسیار زیادی از طراح بگیرد و زمان را هدر بدهد.",
    features: [
      {
        icon: (
          <span className="i-fluent:slide-text-sparkle-24-regular text-xl"></span>
        ),
        title: "تایتل عنوان",
        description:
          "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده.",
      },
      {
        icon: <span className="i-fluent:location-24-filled text-xl"></span>,
        title: "تایتل عنوان",
        description:
          "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده.",
      },
      {
        icon: <span className="i-fluent:diamond-24-filled text-xl"></span>,
        title: "تایتل عنوان",
        description:
          "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده.",
      },
    ],
  },
  {
    id: "Cost Expenses",
    image: Altravel,
    backgroundImage: "./img/9e4a0d416a76e5c5bd041084a6226dcd.jpg",
    title: "محاسبه هزینه سفر",
    description:
      "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده نیاز به متن های تستی و آزمایشی دارند و از آنجایی که تایپ متن های آزمایشی می تواند زمان بسیار زیادی از طراح بگیرد و زمان را هدر بدهد.",
    features: [
      {
        icon: (
          <span className="i-fluent:slide-text-sparkle-24-regular text-xl"></span>
        ),
        title: "تایتل عنوان",
        description:
          "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده.",
      },
      {
        icon: <span className="i-fluent:location-24-filled text-xl"></span>,
        title: "تایتل عنوان",
        description:
          "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده.",
      },
      {
        icon: <span className="i-fluent:diamond-24-filled text-xl"></span>,
        title: "تایتل عنوان",
        description:
          "از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده.",
      },
    ],
  },
];

function TabContent({ visibleTabs, selectedTab }: TabContentProps) {
  const totalVisibleTabs = visibleTabs.length;
  const centerPosition = (totalVisibleTabs - 1) * 5;

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col gap-8 items-center md:hidden">
          {cardData.map((card) => (
            <div key={card.id} className="w-full flex justify-center">
              <PlannerCard
                image={card.image}
                backgroundImage={card.backgroundImage}
                title={card.title}
                description={card.description}
                features={card.features}
              />
            </div>
          ))}
        </div>

        <div className="hidden md:flex relative w-full max-w-5xl h-[350px] justify-center items-center mx-auto">
          {visibleTabs.map((tab, index) => {
            const stackOffset = index * 10;
            const isActive = tab === selectedTab;
            const card = cardData.find((c) => c.id === tab);

            if (!card) return null;

            return (
              <div
                key={tab}
                className="absolute w-full transition-all duration-500 ease-in-out flex justify-center"
                style={{
                  top: `${stackOffset - centerPosition}px`,
                  zIndex: isActive ? totalVisibleTabs + 1 : index,
                }}
              >
                <PlannerCard
                  image={card.image}
                  backgroundImage={card.backgroundImage}
                  title={card.title}
                  description={card.description}
                  features={card.features}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { TabContent };
