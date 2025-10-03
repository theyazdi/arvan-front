interface TravelerRowProps {
    icon: string;
    label: string;
    value: string;
    gender? : boolean;
  }
  
function TravelerRow ({ icon, label, value }: TravelerRowProps) {
    return (
      <div className="flex gap-2 items-start ">
        <span className={`${icon} h-6 w-6`}></span>
        <div className="flex flex-col gap-1">
          <span className="font-medium">{label}</span>
          <span className="font-medium text-gray">{value}</span>
        </div>
      </div>
    );
  }
  
  export {TravelerRow}