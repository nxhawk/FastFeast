import { type Metadata } from "next";
import React from "react";
import { type Category } from "@prisma/client";
import CategoryHeader from "@/components/admin/category/category-header";
import CategoryTable from "@/components/admin/category/category-table";

export const metadata: Metadata = {
  title: "Danh mục Sản phẩm - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const getListCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/category`, {
    next: { tags: ["categories"] },
  });
  const categories = await res.json();
  return categories.data as Category[];
};

const Page = async () => {
  const categories = await getListCategory();
  return (
    <div>
      <CategoryHeader />
      <CategoryTable categories={categories} />
    </div>
  );
};

export default Page;
