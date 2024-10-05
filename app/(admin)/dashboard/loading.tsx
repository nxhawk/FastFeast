import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CardStatisticSkeleton from "@/components/common/skeleton/card-statistic-skeleton";
import TableOrderSkeleton from "@/components/common/skeleton/table-order-skeleton";

const Loading = () => {
  return (
    <div className="pt-6">
      <div className="space-y-1 border-l-4 border-cyan-400 pl-4">
        <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Xin chào!</h1>
        <Skeleton className="h-6 w-[140px]" />
      </div>
      <CardStatisticSkeleton />
      <div className="mt-8">
        <div className="border rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="space-y-1.5">
              <Skeleton className="w-[100px] h-5" />
              <Skeleton className="w-[150px] h-4" />
            </div>
            <Skeleton className="w-[100px] h-8" />
          </div>
          <TableOrderSkeleton columns={6} rows={6} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
