"use client";
import { type OrderState } from "@prisma/client";
import React from "react";
import { cn } from "@/lib/utils";
import { convertOrderStatusToInfo } from "@/utils/helper";

const StatusOrder = ({ status }: { status: OrderState }) => {
  const info = convertOrderStatusToInfo(status);
  return (
    <div
      className={cn(
        "border-orange-200 bg-orange-50 text-orange-600",
        "bg-blue-500 text-white",
        "bg-green-500",
        "bg-red-500",
        "w-fit rounded py-0.5 px-2 text-xs font-semibold text-nowrap",
        info.className,
      )}
    >
      {info.name}
    </div>
  );
};

export default StatusOrder;
