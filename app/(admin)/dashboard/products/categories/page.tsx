import { type Metadata } from "next";
import React from "react";
import CategoryHeader from "@/components/admin/category/category-header";

export const metadata: Metadata = {
  title: "Danh mục Sản phẩm - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = () => {
  return (
    <div>
      <CategoryHeader />
    </div>
  );
};

export default Page;
