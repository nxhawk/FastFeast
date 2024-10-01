import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";
import { type EPaymentType } from "..";
import { cn } from "@/lib/utils";

interface Props {
  icon: string;
  type: EPaymentType;
  title: string;
  value: EPaymentType;
  setValue: React.Dispatch<React.SetStateAction<EPaymentType>>;
}

const PaymentCash = ({ icon, type, value, setValue, title }: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all overflow-hidden cursor-pointer w-52 flex items-center gap-3 p-4 py-3 border rounded-lg",
        type === value && "border-red-600",
      )}
      onClick={() => setValue(type)}
    >
      {type === value && (
        <>
          <span className="absolute top-0 right-0 bg-red-600 aspect-square w-10 rotate-45 translate-x-1/2 -translate-y-1/2"></span>
          <Check size={12} className="absolute top-1 right-0.5 text-white" />
        </>
      )}
      <Image
        alt={type}
        loading="lazy"
        width="32"
        height="32"
        className="w-8 aspect-square object-cover object-center"
        src={icon}
      />
      <span>{title}</span>
    </div>
  );
};

export default PaymentCash;
