import { type Metadata } from "next";
import React from "react";
import EditOrderForm from "@/components/admin/order/edit/edit-order-form";
import { getOrderById } from "@/models/order";

export const metadata: Metadata = {
  title: "Thông tin đơn hàng - Fast Food Ordering website",
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
  const order = await getOrderById(params.id);

  return (
    <div>
      <EditOrderForm order={order} />
    </div>
  );
};

export default Page;
