import { type Metadata } from "next";
import React from "react";
import ProductHeader from "@/components/admin/product-header";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = () => {
  return (
    <div>
      <ProductHeader />
    </div>
  );
};

export default Page;
