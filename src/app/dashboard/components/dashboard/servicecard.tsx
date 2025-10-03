import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

interface ServiceCardProps {
  title: string;
  description: string;
  url?: string;
}

function ServiceCard({ title, description, url }: ServiceCardProps) {
  return (
    <div className="flex items-center p-5 bg-white rounded-xl gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p>{description}</p>
      </div>
      <Link href={url || ""}>
        <Button size={"icon"}>
          <span className="i-fluent:arrow-up-left-24-regular"></span>
        </Button>
      </Link>
    </div>
  );
}

export { ServiceCard };
