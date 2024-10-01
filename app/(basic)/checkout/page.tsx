import { type Metadata } from "next";
import React from "react";
import OrderPage from "@/components/user/order/order-page";

export const metadata: Metadata = {
  title: "Xác nhận đặt hàng | FastFeast - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = () => {
  return (
    <div>
      <OrderPage />
    </div>
  );
};

export default Page;
