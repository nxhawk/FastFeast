import { type Metadata } from "next";
import React from "react";
import CategoryHeader from "@/components/admin/category/category-header";
import CategoryTable from "@/components/admin/category/category-table";
import { listCategories } from "@/models/category";

export const metadata: Metadata = {
  title: "Danh mục Sản phẩm - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = async () => {
  const categories = await listCategories();
  return (
    <div>
      <CategoryHeader />
      <CategoryTable categories={categories} />
    </div>
  );
};

export default Page;
