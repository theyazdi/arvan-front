import Image from "next/image";
import HeaderImage from "../../../../public/img/123.png";
import HeaderImageMobile from "../../../../public/img/Frame 1000002898.png";
import { SmartTravel } from "@/app/aboutus";
import { Faq } from "@/app/components";
import { AirplaneSearch, AirplaneSearchMobile } from "@/components/share/searchBar";


function TicketsWithoutParams() {
  return (
    <div className="flex flex-col md:items-center mt-10 w-full">
      <Image src={HeaderImage} alt="HeaderImage" className="hidden md:block mx-auto"/>
      <Image src={HeaderImageMobile} alt="HeaderImage" className="block md:hidden mx-auto"/>
      <div className=" w-full px-5 mt-10">
        <AirplaneSearch hasParams={true} />
        <AirplaneSearchMobile />
      </div>
      <div className="md:mt-40 mt-14 flex flex-col gap-10">
        <SmartTravel title="خرید بلیط هواپیما" icon="i-fluent:airplane-16-filled" />
      </div>
      <div className="mt-40 w-full">
        <Faq type="tickets" />
      </div>
    </div>
  );
}

export {TicketsWithoutParams}