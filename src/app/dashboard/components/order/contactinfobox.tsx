import { ContactInfoItem } from "./contactinfoitem";

export interface ContactInfoBoxProps {
  phoneNumber : string;
  email : string
}

function ContactInfoBox({email , phoneNumber} : ContactInfoBoxProps) {
  return (
    <div className="rounded-2xl bg-[#FAFAFA] p-6 flex items-center">
      <div className="flex flex-col gap-1 flex-1">
        <ContactInfoItem
          icon="i-fluent:call-16-regular"
          label="شماره تماس"
          value={phoneNumber}
        />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <ContactInfoItem
          icon="i-fluent:mail-24-regular"
          label="ایمیل"
          value={email}
        />
      </div>
    </div>
  );
}

export { ContactInfoBox };
