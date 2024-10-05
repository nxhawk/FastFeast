import React from "react";
import TableOrderSkeleton from "@/components/common/skeleton/table-order-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="pt-6">
      <div className="flex gap-2 items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Sản Phẩm</h1>
        <Skeleton className="w-[150px] h-8" />
      </div>
      <div className="mt-8">
        <TableOrderSkeleton columns={6} rows={10} />
      </div>
    </div>
  );
};

export default Loading;
