import { type Metadata } from "next";
import React from "react";
import OrderTable from "@/components/admin/order/order-table";
import { getAllOrder } from "@/models/order";
import { SelectDate } from "@/components/common/select-date";
import { formateDateSearchParam } from "@/utils/helper";

export const metadata: Metadata = {
  title: "Báo cáo - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "/images/logo.png",
};

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const fromDay = searchParams?.from ? decodeURI(searchParams?.from as string) : formateDateSearchParam(new Date());
  const toDay = searchParams?.to ? decodeURI(searchParams?.to as string) : formateDateSearchParam(new Date());
  const orders = await getAllOrder(fromDay, toDay);

  return (
    <div className="pt-8">
      <div className="mb-5 text-2xl font-medium text-gray-900 leading-8">Đơn hàng</div>
      <div>
        <p className="mb-1 text-sm text-gray-600">Chọn khoảng thời gian</p>
        <SelectDate />
      </div>
      <OrderTable orders={orders} showStatistics />
    </div>
  );
};

export default Page;
