import { Button } from "@/components/ui";
import { PassportList, VisaForm, VisType } from "@/app/dashboard/components";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_BASE_URL } from "@/lib";

export interface VisaInfoFormData {
  passport_first_name: string;
  passport_last_name: string;
  birthday: string;
  passport_number: string;
  sexuality: "MALE" | "FEMALE" | "OTHER";
  passport_country: string;
  visa_type: "tourist" | "business" | "student";
}

const schema = z.object({
  passport_first_name: z.string().min(1),
  passport_last_name: z.string().min(1),
  birthday: z.string().min(1),
  sexuality: z.enum(["MALE", "FEMALE", "OTHER"]),
  passport_country: z.string().min(1),
  visa_type: z.enum(["tourist", "business", "student"]),
  passport_number: z.string().min(2),
});

interface VisaInfoProps {
  token: string;
  nextStep: () => void;
  passengerList: boolean;
  setPassengerList: () => void;
  getData: () => void;
}

function VisaInfo({
  token,
  nextStep,
  passengerList,
  setPassengerList,
  getData,
}: VisaInfoProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<VisaInfoFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: VisaInfoFormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/panel/visa-request/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        getData();
        nextStep();
      }
      const result = await response.json();
      
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-3 "
    >
      <div className=" border-gray-3 rounded-2xl p-4 border">
        <div className=" flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm">اطلاعات کلی</h3>
            <p className="text-sm text-gray-5 font-300">
            اطلاعات خواسته شده درباره مسافر را اضافه کنید
            </p>
          </div>
          <Button
            variant={"link"}
            className="text-sm underline text-gray-7"
            onClick={setPassengerList}
            type="button"
          >
            {passengerList
              ? "انتخاب از مسافر از قبل ایجاد شده"
              : "انتخاب از مسافر از قبل ایجاد شده"}
          </Button>
        </div>
        <div>
          {passengerList ? (
            <PassportList />
          ) : (
            <VisaForm
              register={register}
              control={control}
              errors={errors}
              reset={reset}
            />
          )}
        </div>
      </div>
      <VisType register={register} control={control} errors={errors} />
      <div className="flex justify-end mt-6">
        <Button className="flex items-center gap-2" size={"sm"}>
          <span className="i-fluent:layer-diagonal-person-24-regular"></span>
          درخواست ویزا
        </Button>
      </div>
    </form>
  );
}

export { VisaInfo };
