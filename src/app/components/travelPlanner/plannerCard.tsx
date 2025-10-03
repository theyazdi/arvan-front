import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

interface PlannerCardProps {
  image: StaticImageData | string;
  backgroundImage: string;
  width?: number;
  height?: number;
  title: string;
  description: string;
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
}

function PlannerCard({
  image,
  backgroundImage,
  width = 1062,
  height = 314,
  title,
  description,
  features,
}: PlannerCardProps) {
  return (
    <>
      <div 
        className="md:hidden bg-cover bg-center rounded-2xl p-8 w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gray-100/30 rounded-2xl"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4">
            <Image src={image} alt="AI icon" className="w-12 h-12" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
          
          <Button
            variant="default"
            size="lg"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white w-full mb-6"
          >
            <span className="i-fluent:search-sparkle-24-regular"></span>
            شروع برنامه ریزی
          </Button>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            {description}
          </p>
          
          <div className="grid grid-cols-1 gap-6 w-full">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2 items-start text-right">
                <div className="flex items-center gap-2">
                  <div className="text-gray-600">{feature.icon}</div>
                  <p className="font-bold text-gray-800">{feature.title}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="hidden md:block bg-cover bg-center rounded-2xl mt-8 p-10 w-full max-w-4xl"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src={image} alt="AI icon - based on budget" />
              <h3 className="text-2xl font-bold">{title}</h3>
            </div>
            <Button
              variant="default"
              size="lg"
              className="flex items-center gap-2"
            >
              <span className="i-fluent:search-sparkle-24-regular mt-1"></span>
              شروع برنامه ریزی
            </Button>
          </div>
          <p className="mt-6">
            {description}
          </p>
          <div className="flex items-center gap-4 mt-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {feature.icon}
                  <p className="font-bold">{feature.title}</p>
                </div>
                <p className="text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export { PlannerCard };
