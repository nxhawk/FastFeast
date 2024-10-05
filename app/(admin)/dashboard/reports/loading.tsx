import React from "react";
import CardStatisticSkeleton from "@/components/common/skeleton/card-statistic-skeleton";
import TableOrderSkeleton from "@/components/common/skeleton/table-order-skeleton";

const Loading = () => {
  return (
    <div className="pt-6">
      <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Đơn hàng</h1>
      <CardStatisticSkeleton />
      <div className="mt-10">
        <TableOrderSkeleton columns={6} rows={6} />
      </div>
    </div>
  );
};

export default Loading;
