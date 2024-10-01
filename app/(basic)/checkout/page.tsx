import { type Metadata } from "next";
import React from "react";
import OrderForm from "@/components/user/order";

export const metadata: Metadata = {
  title: "Thanh toán | FastFeast - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = () => {
  return (
    <div>
      <OrderForm />
    </div>
  );
};

export default Page;
