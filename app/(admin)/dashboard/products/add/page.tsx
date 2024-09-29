import { type Metadata } from "next";
import React from "react";
import { unstable_cache } from "next/cache";
import AddProductForm from "@/components/admin/product/new/add-product-form";
import { listCategories } from "@/models/category";

export const metadata: Metadata = {
  title: "Thêm sản phẩm - Fast Food Ordering website",
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
      <AddProductForm categories={categories} product={null} />
    </div>
  );
};

export default Page;
