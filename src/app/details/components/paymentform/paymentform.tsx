"use client";
import { Button } from "@/components/ui";
import { useWizard } from "@/hooks";

type Passenger = {
  passportName: string;
  passportFamilyName: string;
  birthday: string;
  gender: "MALE" | "FEMALE";
  passportCountry: string;
  email: string;
  phone: string;
};

type PassengersFormData = {
  adults: Passenger[];
};

function PaymentForm() {
  const { data, prevStep } = useWizard();
  const passengers: PassengersFormData | undefined = data.passengers;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">اطلاعات مسافرها</h3>
        <Button
          variant={"outline"}
          className="flex items-center gap-2 rounded-2xl p-4"
          onClick={prevStep}
        >
          <span className="i-fluent:edit-24-regular"></span>
          تغییر اطلاعات
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {passengers?.adults?.map((adult, i) => (
          <div
            key={i}
            className="border p-4 rounded-xl shadow-sm bg-gray-50 flex flex-col gap-8"
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3 font-medium">
                  <span className="i-fluent:person-24-regular h-6 w-6 text-[#EA443F]"></span>
                  <span>بزرگسال {i + 1}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray">نام:</span>
                    <span className="font-medium">{adult.passportName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">نام خانوادگی:</span>
                    <span className="font-medium">
                      {adult.passportFamilyName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">جنسیت:</span>
                    <span className="font-medium">
                      {adult.gender === "MALE" ? "مرد" : "زن"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">ملیت:</span>
                    <span className="font-medium">{adult.passportCountry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">تاریخ تولد:</span>
                    <span className="font-medium">{adult.birthday}</span>
                  </div>
                </div>
              </div>
              <div className="w-px bg-gray-3 h-50 mx-13"></div>
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3 font-medium">
                  <span className="i-fluent:call-24-regular h-6 w-6 text-[#EA443F]"></span>
                  <span>اطلاعات تماس</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray">شماره همراه:</span>
                    <span className="font-medium">{adult.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray">ایمیل:</span>
                    <span className="font-medium">{adult.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { PaymentForm };
