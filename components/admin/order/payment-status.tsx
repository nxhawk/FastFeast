import { PaymentMethod } from "@prisma/client";
import { Check, CircleCheck } from "lucide-react";
import React from "react";

const PaymentStatus = ({ status }: { status: PaymentMethod }) => {
  return (
    <div className="flex text-sm flex-col">
      <div className="flex items-center gap-1">
        {status === PaymentMethod.CASH ? "Chưa thanh toán" : "Đã thanh toán"}
        {status === PaymentMethod.CASH ? (
          <div className="text-white rounded-full p-0.5 flex bg-gray-300">
            <Check className="h-2.5 w-2.5" />
          </div>
        ) : (
          <div className="text-white rounded-full p-0.5 flex bg-green-600">
            <Check className="h-2.5 w-2.5" />
          </div>
        )}
      </div>
      <p className="text-xs text-gray-600">Ship COD</p>
    </div>
  );
};

export default PaymentStatus;
