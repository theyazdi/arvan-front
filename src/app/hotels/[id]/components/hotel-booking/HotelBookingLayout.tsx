"use client";
import { StepNavigator } from "@/components/ui/stepNavigator";
import { HorizontalStepNavigator } from "@/components/ui/horizontalStepNavigator";
import { useWizard } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/(auth)";
import { HotelGuestForm, HotelPaymentForm, HotelConfirmation } from "./index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { postRefId } from "@/lib/postrefid";
import { createHotelOrder } from "../../../actions";
import { API_BASE_URL } from "@/lib/fetch";
import { formatPriceWithToman } from "@/lib/price";

interface HotelBookingLayoutProps {
  hotelData: any;
  selectedRoom: any;
  adults: number;
  children: number;
  rooms: number;
  token?: string;
}

interface HotelGatewayToken {
  gateway_token: {
    code: number;
    content: string;
  };
}

function HotelBookingLayout({
  hotelData,
  selectedRoom,
  adults,
  children,
  rooms,
  token
}: HotelBookingLayoutProps) {
  const { currentStep, totalSteps, prevStep, nextStep, setStepData, goToStep, data } = useWizard();
  const searchParams = useSearchParams();
  const { isLoggedIn, token: authToken } = useAuth();
  
  const apiToken = token || authToken;
  

  const [formMethods, setFormMethods] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("بانک سامان");
  const [discountCode, setDiscountCode] = useState("");
  const [gatewayToken, setGatewayToken] = useState<HotelGatewayToken>();
  
  const params = {
    city: searchParams.get("city") || "",
    check_in_date: searchParams.get("check_in_date") || "",
    check_out_date: searchParams.get("check_out_date") || "",
  };


  const calculateNights = () => {
    if (!params.check_in_date || !params.check_out_date) return 1;
    const checkIn = new Date(params.check_in_date);
    const checkOut = new Date(params.check_out_date);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const pricePerNight = selectedRoom ? Number(selectedRoom.price.total) : 0;
  const serviceFee = selectedRoom?.price?.serviceFee ? Number(selectedRoom.price.serviceFee) : 0;
  const discount = selectedRoom?.price?.discount ? Number(selectedRoom.price.discount) : 0;
  const total = (pricePerNight * nights) + serviceFee - discount;

  const steps = [
    {
      title: `هتل ${hotelData?.name || ""}`,
      number: 1,
      key: "hotel-selection",
      icon: (
        <span className="i-fluent:building-24-regular h-4 w-4 text-gray-900"></span>
      ),
      iconFilled: (
        <span className="i-fluent:building-24-filled h-4 w-4 text-red-500"></span>
      ),
    },
    {
      title: "انتخاب اتاق",
      number: 2,
      key: "room-selection",
      icon: (
        <span className="i-fluent:bed-24-regular h-4 w-4 text-gray-900"></span>
      ),
      iconFilled: (
        <span className="i-fluent:bed-24-filled h-4 w-4 text-red-500"></span>
      ),
    },
    {
      title: "اطلاعات مسافرین",
      number: 3,
      key: "guest-information",
      icon: (
        <div className="relative">
          <span className="i-fluent:people-24-regular h-4 w-4 text-gray-600"></span>
          <span className="i-fluent:info-16-regular h-2 w-2 text-gray-600 absolute -top-1 -right-1"></span>
        </div>
      ),
      iconFilled: (
        <div className="relative">
          <span className="i-fluent:people-24-filled h-4 w-4 text-red-500"></span>
          <span className="i-fluent:info-16-filled h-2 w-2 text-red-500 absolute -top-1 -right-1"></span>
        </div>
      ),
    },
    {
      title: "مدل پرداخت",
      number: 4,
      key: "payment",
      icon: (
        <span className="i-fluent:wallet-24-regular h-4 w-4 text-gray-600"></span>
      ),
      iconFilled: (
        <span className="i-fluent:wallet-24-filled h-4 w-4 text-red-500"></span>
      ),
    },
    {
      title: "تایید رزرو",
      number: 5,
      key: "reservation-confirmation",
      icon: (
        <span className="i-fluent:checkmark-circle-16-regular h-4 w-4 text-gray-900"></span>
      ),
      iconFilled: (
        <span className="i-fluent:checkmark-circle-16-filled h-4 w-4 text-red-500"></span>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      const hotelDetails = {
        hotelId: hotelData?.id,
        hotelName: hotelData?.name,
        checkIn: params.check_in_date,
        checkOut: params.check_out_date,
        adults,
        children,
        rooms,
      };
      setStepData("hotel", hotelDetails);
      nextStep();
    }
    if (currentStep === 2) {
      if (!isLoggedIn) {
        setOpen(true);
        return;
      }
      
      if (formMethods) {
        formMethods.handleSubmit(async (guests: any) => {
          
          try {
            if (!apiToken) {
              throw new Error("توکن احراز هویت موجود نیست. لطفا ابتدا وارد شوید.");
            }


            const hotelItinerary = {
              SessionId: "HTL_SESSION_" + Date.now(),
              CombinationId: 1,
              RecommendationId: 1,
              SubsystemId: 1,
              SubsystemName: "HotelBooking"
            };

            const processedPassengers: any[] = guests.rooms?.map((room: any, roomIndex: number) =>
              room.guests.map((guest: any, guestIndex: number) => {
                const passengerData: any = {};
                
                if (guest.passportName && guest.passportName.trim() !== "") {
                  passengerData.PersonName = {
                    GivenName: guest.passportName,
                    Surname: guest.passportFamilyName || ""
                  };
                  
                  if (guest.gender && guest.gender !== "") {
                    passengerData.PersonName.NamePrefix = guest.gender;
                  }
                }
                
                if (guest.passportCountry && guest.passportCountry.trim() !== "") {
                  passengerData.Document = {
                    DocIssueCountry: guest.passportCountry
                  };
                  passengerData.PassengerTypeCode = guest.passportCountry;
                }
                
                if (guest.birthday && guest.birthday.trim() !== "") {
                  passengerData.BirthDate = guest.birthday;
                }
                
                if (guest.nationalCode && guest.nationalCode.trim() !== "") {
                  passengerData.NationalCode = guest.nationalCode;
                }
                
                return passengerData;
              })
            ).flat().filter((passenger: any) => 
              passenger.PersonName && 
              passenger.PersonName.GivenName && 
              passenger.PersonName.GivenName.trim() !== ""
            ) || [];

            const hotelRequest = {
              HotelItinerary: hotelItinerary,
              AirTraveler: processedPassengers,
            };


            
            const response = await fetch(`${API_BASE_URL}/hotel/order-create/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiToken}`,
              },
              body: JSON.stringify(hotelRequest),
            });

            if (!response.ok) {
              const errorText = await response.text();
  
              throw new Error(`خطا در ایجاد سفارش هتل: ${response.status} - ${errorText}`);
            }

            const responseData = await response.json();
            setGatewayToken(responseData);
            

            setStepData("passengers", guests);
            nextStep();
            
          } catch (error) {

            
            let errorMessage = 'خطای نامشخص';
            if (error instanceof Error) {
              errorMessage = error.message;
            } else if (typeof error === 'string') {
              errorMessage = error;
            } else if (error && typeof error === 'object') {
              errorMessage = JSON.stringify(error);
            }
            
            alert(`خطا در ایجاد سفارش: ${errorMessage}`);

            return;
          }
        }, (errors: any) => {

          

          let errorMessages = "❌ فیلدهای زیر باید پر شوند:\n\n";
          
          if (errors.rooms) {
            errors.rooms.forEach((room: any, roomIndex: number) => {
              if (room.guests) {
                room.guests.forEach((guest: any, guestIndex: number) => {
                  if (guest) {
                    Object.keys(guest).forEach(field => {
                      if (guest[field]?.message) {
                        const fieldNames: { [key: string]: string } = {
                          passportName: "نام در گذرنامه",
                          passportFamilyName: "نام خانوادگی در گذرنامه", 
                          birthday: "تاریخ تولد",
                          gender: "جنسیت",
                          passportCountry: "کشور",
                          passportNumber: "شماره پاسپورت",
                          nationalCode: "کد ملی"
                        };
                        
                        const persianFieldName = fieldNames[field] || field;
                        errorMessages += `📍 اتاق ${roomIndex + 1}، مسافر ${guestIndex + 1}:\n   ${persianFieldName}\n\n`;
                      }
                    });
                  }
                });
              }
            });
          }
          
          alert(errorMessages);
        })();
      }
    } else if (currentStep === 3) {
      if (gatewayToken && gatewayToken.gateway_token && gatewayToken.gateway_token.content) {
        const primaryGuest = data.passengers?.rooms?.[0]?.guests?.[0];
        const mobileNumber = primaryGuest?.phone || "";
        postRefId(gatewayToken.gateway_token.content, mobileNumber);
      } else {
        nextStep();
      }
    } else {
      nextStep();
    }
  };

  const selectedStepMap = () => {
    const stepMap: Record<string, React.ReactNode> = {
      "1": (
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">جزئیات هتل</h1>
            <p className="text-gray-600">اطلاعات هتل انتخاب شده</p>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="i-fluent:building-24-regular h-5 w-5 text-red-500"></span>
              <h2 className="text-lg font-semibold">{hotelData?.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">تاریخ ورود:</span>
                <p className="font-semibold">{params.check_in_date}</p>
              </div>
              <div>
                <span className="text-gray-600">تاریخ خروج:</span>
                <p className="font-semibold">{params.check_out_date}</p>
              </div>
              <div>
                <span className="text-gray-600">تعداد مهمان:</span>
                <p className="font-semibold">{adults} بزرگسال{children ? `، ${children} کودک` : ''}</p>
              </div>
              <div>
                <span className="text-gray-600">تعداد اتاق:</span>
                <p className="font-semibold">{rooms} اتاق</p>
              </div>
            </div>
          </div>
        </div>
      ),
      "2": (
        <HotelGuestForm
          onSubmit={() => handleNext()}
          setFormMethods={setFormMethods}
          adults={adults}
          children={children}
          rooms={rooms}
          open={open}
          setOpen={setOpen}
        />
      ),
      "3": <HotelPaymentForm 
        onSubmit={() => handleNext()} 
        hotelData={hotelData}
        selectedRoom={selectedRoom}
        adults={adults}
        children={children}
        rooms={rooms}
      />,
      "4": <HotelConfirmation />,
    };
    return stepMap[currentStep.toString()];
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row px-4 py-6 gap-6">
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* Mobile Step Navigator */}
          <div className="md:hidden">
            <HorizontalStepNavigator
              currentStep={currentStep}
              goToStep={goToStep}
              steps={steps}
              totalSteps={totalSteps}
            />
          </div>
          
          {/* Desktop Step Navigator */}
          <div className="hidden md:block">
            <StepNavigator
              model="hotel"
              title="مراحل"
              currentStep={currentStep}
              goToStep={goToStep}
              onBack={prevStep}
              steps={steps}
              totalSteps={totalSteps}
            />
          </div>
          <div className="bg-white px-6 md:px-12 py-6 md:py-8 shadow-lg rounded-2xl h-fit">
            {selectedStepMap()}
          </div>
          
          {/* Mobile Navigation Buttons - Outside the white box */}
          <div className="md:hidden space-y-4">
            {currentStep !== 3 && currentStep !== 5 && (
              <button 
                className="w-full py-4 text-base bg-black text-white rounded-xl font-bold hover:bg-black/90 transition"
                onClick={handleNext}
              >
                تایید و ادامه خرید
              </button>
            )}
            
            {currentStep === 5 && (
              <button 
                className="w-full py-4 text-base bg-black text-white rounded-xl font-bold hover:bg-black/90 transition"
                onClick={handleNext}
              >
                بازگشت به صفحه اصلی
              </button>
            )}
          </div>
        </div>
        <div className="hidden md:block w-1/3 bg-white p-6 shadow-lg rounded-2xl h-fit sticky top-4">
          <div className="bg-[#FAFAFA] rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col flex-1">
                <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><span className="i-fluent:calendar-ltr-24-regular w-6 h-6 text-red-500"></span> ورود</span>
                <span className="text-sm font-bold">{params.check_in_date}</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><span className="i-fluent:calendar-ltr-24-regular w-6 h-6 text-red-500"></span> خروج</span>
                <span className="text-sm font-bold">{params.check_out_date}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col flex-1">
                <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><span className="i-fluent:bed-24-regular w-6 h-6 text-red-500"></span> اتاق</span>
                <span className="text-sm font-bold">{selectedRoom?.name || 'اتاق انتخاب نشده'}</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><span className="i-fluent:people-24-regular w-6 h-6 text-red-500"></span> مهمان</span>
                <span className="text-sm font-bold">{adults} بزرگسال{children ? `، ${children} کودک` : ''}</span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div className="text-base font-bold mb-4">قیمت</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">{nights} شب</span>
              <span className="text-sm">{formatPriceWithToman(pricePerNight * nights)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">هزینه سرویس</span>
              <span className="text-sm">{formatPriceWithToman(serviceFee)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">تخفیف</span>
              <span className="text-sm">{formatPriceWithToman(discount)}</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold">جمع کل</span>
              <span className="text-lg font-bold">{formatPriceWithToman(total)}</span>
            </div>
          </div>
          
          {currentStep === 3 && (
            <>
              {/* Discount Code Input */}
              <div className="mb-6 ">
                <div className="flex gap-3">
                  <Input
                    placeholder="کد تخفیف"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    className="bg-gray-100 hover:bg-gray-200"
                    size="sm"
                    onClick={() => {
                      if (discountCode.trim()) {
                        alert(`کد تخفیف ${discountCode} اعمال شد`);
                      } else {
                        alert("لطفا کد تخفیف را وارد کنید");
                      }
                    }}
                  >
                    اعمال
                  </Button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="i-fluent:money-24-regular w-6 h-6 text-red-500"></span>
                  <h4 className="text-xl font-bold">روش های پرداخت</h4>
                </div>
                
                <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                  className="flex flex-col space-y-4"
                  dir="rtl"
                >
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                    <RadioGroupItem value="account" id="account" className="text-pink-500" />
                    <div className="flex-1">
                      <Label htmlFor="account" className="text-sm font-medium">
                        برداشت از موجودی حساب کاربری
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">
                        موجودی: 0 تومان - در صورت لغو رزرو، مبلغ به حساب شما بازگردانده می‌شود
                      </p>
                    </div>
                    <span className="text-sm font-bold">0 تومان</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                    <RadioGroupItem value="بانک سامان" id="saman" className="text-pink-500" />
                    <Label htmlFor="saman" className="text-sm font-medium flex-1">
                      درگاه بانک سامان
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                    <RadioGroupItem value="بانک ملی" id="meli" className="text-pink-500" />
                    <Label htmlFor="meli" className="text-sm font-medium flex-1">
                      درگاه بانک ملی
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <button 
                className="w-full py-4 text-base bg-black text-white rounded-xl font-bold hover:bg-black/90 transition"
                onClick={() => {
                  handleNext();
                }}
              >
                تایید و ادامه خرید
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                با کلیک بر روی دکمه تایید و مشاهده ی فاکتور به منزله ی مطالعه <span className="text-red-500">قوانین</span> و <span className="text-red-500">مقررات</span> و اطمینان از درستی اطلاعات وارد شده میباشد.
              </p>
            </>
          )}
          
          {currentStep !== 3 && (
            <button 
              className="w-full py-4 text-base bg-black text-white rounded-xl font-bold hover:bg-black/90 transition"
              onClick={handleNext}
            >
              {currentStep === 5 ? "بازگشت به صفحه اصلی" : "تایید و ادامه خرید"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { HotelBookingLayout }; 