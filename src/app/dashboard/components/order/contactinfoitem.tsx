interface ContactInfoItemProps {
    icon: string;
    label: string;
    value: string;
  }
  
  function ContactInfoItem({ icon, label, value }: ContactInfoItemProps) {
    return (
      <div className="flex items-start gap-2">
        <span className={`${icon} w-6 h-6 bg-[#EA443F]`}></span>
        <div className="flex flex-col gap-2">
          <span>{label}</span>
          <p className="text-sm text-gray">{value}</p>
        </div>
      </div>
    );
  }
  
  export { ContactInfoItem };
  