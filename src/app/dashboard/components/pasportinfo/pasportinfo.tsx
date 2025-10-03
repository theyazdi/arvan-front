"use client";
import {
  AddPassportInfo,
  PassportEmptyState,
  PassportTabelLoading,
} from "@/app/dashboard/components";
import { PassportTabel } from "./passporttabel";
import { API_BASE_URL } from "@/lib";
import { useEffect, useState } from "react";

export interface PassportInfo {
  id: number;
  passanger_first_name: string;
  passanger_last_name : string
  sexuality: "MALE" | "FEMALE" | "OTHER";
  birthday: string;
  passport_number: string;
  passport_expiration_date: string;
  passport_country: string;
}

function PasportInfo({ token }: { token: string  }) {
  const [passportData, setPassportData] = useState<PassportInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/panel/passport-info/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPassportData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="">
        <PassportTabelLoading />
      </div>
    );
  }
  return (
    <div className="mt-14">
      {passportData.length > 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">اطلاعات پاسپورت</h3>
            <AddPassportInfo
              mode="add"
              token={token}
              getData={getData}
            />
          </div>
          <PassportTabel
            passportData={passportData}
            token={token}
            getData={getData}
          />
        </div>
      ) : (
        <PassportEmptyState
          token={token}
          getData={getData}
        />
      )}
    </div>
  );
}

export { PasportInfo };
