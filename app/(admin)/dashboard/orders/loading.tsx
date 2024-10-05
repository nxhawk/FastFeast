import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TableOrderSkeleton from "@/components/common/skeleton/table-order-skeleton";

const Loading = () => {
  return (
    <div className="pt-8">
      <div className="mb-3 text-2xl font-medium text-gray-900 leading-8">Đơn hàng</div>
      <div className="mt-8">
        <TableOrderSkeleton columns={6} rows={10} />
      </div>
    </div>
  );
};

export default Loading;
