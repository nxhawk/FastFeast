import { type Metadata } from "next";
import React from "react";
import OrderTable from "@/components/admin/order/order-table";
import { getAllOrder } from "@/models/order";

export const metadata: Metadata = {
  title: "Đơn hàng - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "/images/logo.png",
};

const Page = async () => {
  const orders = await getAllOrder();

  return (
    <div className="pt-8">
      <div className="mb-3 text-2xl font-medium text-gray-900 leading-8">Đơn hàng</div>
      <OrderTable orders={orders} />
    </div>
  );
};

export default Page;
