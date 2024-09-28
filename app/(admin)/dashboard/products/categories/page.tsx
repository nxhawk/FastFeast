import { type Metadata } from "next";
import React from "react";
import { unstable_cache } from "next/cache";
import CategoryHeader from "@/components/admin/category/category-header";
import CategoryTable from "@/components/admin/category/category-table";
import { listCategories } from "@/models/category";

export const metadata: Metadata = {
  title: "Danh mục Sản phẩm - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const getCategories = unstable_cache(
  async () => {
    return listCategories();
  },
  ["categories"],
  { tags: ["categories"] },
);

const Page = async () => {
  const categories = await getCategories();
  return (
    <div>
      <CategoryHeader />
      <CategoryTable categories={categories} />
    </div>
  );
};

export default Page;
