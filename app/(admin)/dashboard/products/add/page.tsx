import { type Metadata } from "next";
import React from "react";
import AddProductForm from "@/components/admin/product/new/add-product-form";

export const metadata: Metadata = {
  title: "Thêm sản phẩm - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = () => {
  return (
    <div>
      <AddProductForm />
    </div>
  );
};

export default Page;
