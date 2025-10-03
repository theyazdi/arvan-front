import { SocialLoginButtons } from "@/app/(login)";
import { Button } from "@/components/ui";


interface CreateAccountProps {
  onClick: () => void;
}

function CreateAccount({ onClick }: CreateAccountProps) {
  return (
    <div className="flex flex-col w-full">
      {/* <SocialLoginButtons /> */}
      <div className="flex items-center gap-2 my-4">
        <hr className="w-full border-gray-300" />
        <span className="text-xs text-gray-500">OR</span>
        <hr className="w-full border-gray-300" />
      </div>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={onClick}
        className="flex items-center gap-2 justify-start bg-[#f9fafb]"
      >
        <span className="i-fluent:add-24-regular h-6 w-6"></span>
        اکانت جدید بسازید
      </Button>
    </div>
  );
}

export { CreateAccount };
