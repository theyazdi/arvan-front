import { ContactInfoBox, ContactInfoBoxProps } from "./contactinfobox";


function ContactInfoSection({email , phoneNumber} : ContactInfoBoxProps) {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <span className="i-fluent:person-call-16-regular h-5 w-5"></span>
        <span className="text-lg font-bold">اطلاعات تماس</span>
      </div>
      <ContactInfoBox email={email} phoneNumber={phoneNumber}/>
    </div>
  );
}

export { ContactInfoSection };
