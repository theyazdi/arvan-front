"use client"
import { API_BASE_URL } from "@/lib";
import { useEffect, useState } from "react";
import { Requestvisa, VisaRules, Visatable } from "@/app/dashboard/components";

interface VisaRequestProps {
  token: string;
}

export interface Visa {
  id: number;
  passport_first_name: string;
  passport_country: string;
  visa_type: string;
  state: string;
  sexuality: string;
  passport_last_name: string;
  birthday: string;
  passport_number: string;
}

function VisaRequest({ token }: VisaRequestProps) {
  const [visaList, setVisaList] = useState<Visa[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/panel/visa-request/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setVisaList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-14">
      {loading ? (
        <div className="text-center py-20 text-gray-5 text-xl">در حال بارگذاری اطلاعات...</div>
      ) : visaList && visaList.length > 0 ? (
        <Visatable visList={visaList} token={token} getData={getData} />
      ) : (
        <div className="mt-14">
          <h3 className="text-2xl font-bold">درخواست ویزا</h3>
          <div className="flex flex-col gap-8 mt-8">
            <p className="text-gray-5 text-xl">
              لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است.
            </p>
            <div className="flex items-center gap-5">
              <Requestvisa token={token} getData={getData} />
              <VisaRules />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { VisaRequest };
