import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TableOrderSkeleton from "@/components/common/skeleton/table-order-skeleton";

const Loading = () => {
  return (
    <div className="pt-6 pb-4 space-y-10">
      <div className="space-y-3">
        <Skeleton className="w-[80px] h-4" />
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Đơn hàng</h1>
        </div>
      </div>
      <div className="flex max-md:flex-col gap-5 w-full">
        <div className="border p-5 rounded-xl w-full md:w-4/6 flex flex-col max-md:gap-4">
          <div className="border-b pb-4 font-bold flex gap-2 items-center">
            Mã đơn:
            <Skeleton className="w-52 h-4" />
          </div>
          <div className="mt-8 space-y-2">
            <TableOrderSkeleton rows={4} columns={5} haveBorder={false} />
            <Skeleton className="w-full h-40" />
            <div className="pt-5 space-y-1">
              <div className="flex gap-1 text-sm items-center">
                <div className="font-semibold w-28">Tình trạng đơn:</div>
                <Skeleton className="w-24 h-4" />
              </div>
              <div className="flex gap-1 text-sm items-start">
                <div className="font-semibold w-28">Thanh toán:</div>
                <Skeleton className="w-28 h-8" />
              </div>
            </div>
          </div>
        </div>
        <div className="border p-5 rounded-xl w-full h-fit md:w-2/6 space-y-8">
          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-8" />
          </div>
          <div className="space-y-3">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-8" />
          </div>
          <div className="space-y-3">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
