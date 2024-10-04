import { type Metadata } from "next";
import React from "react";
import OrderTable from "@/components/admin/order/order-table";
import { getAllOrder } from "@/models/order";
import { SelectDate } from "@/components/common/select-date";

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
  const fromDay = searchParams?.from ? decodeURI(searchParams?.from as string) : "";
  const toDay = searchParams?.to ? decodeURI(searchParams?.to as string) : "";
  const orders = await getAllOrder(fromDay, toDay);

  return (
    <div className="pt-8">
      <div className="mb-3 text-2xl font-medium text-gray-900 leading-8">Đơn hàng</div>
      <SelectDate />
      <OrderTable orders={orders} />
    </div>
  );
};

export default Page;
