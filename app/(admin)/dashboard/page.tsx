import { type Metadata } from "next";
import React from "react";
import { formateDate } from "@/utils/helper";
import { getAllOrder, getStatisticsDashboard } from "@/models/order";
import OrderTable from "@/components/admin/order/order-table";
import ListBoxStatistic2 from "@/components/admin/statistic/list-box-statistic-2";
import ListOrderReview from "@/components/admin/dashboard/list-order-review";

export const metadata: Metadata = {
  title: "Dashboard | Admin site | FastFeast - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "/images/logo.png",
};

const Page = async () => {
  const orders = await getAllOrder();
  const statistics = await getStatisticsDashboard();

  return (
    <div className="pt-6">
      <div className="space-y-1 border-l-4 border-cyan-400 pl-4">
        <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Xin chào!</h1>
        <p className="text-sm text-gray-900 leading-6 whitespace-pre">{formateDate(new Date())}</p>
      </div>
      <div className="mt-6">
        <ListBoxStatistic2 statistics={statistics} />
      </div>
      <ListOrderReview>
        <OrderTable orders={orders} showStatistics showOptions={false} />
      </ListOrderReview>
    </div>
  );
};

export default Page;
