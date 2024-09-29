import { type Metadata } from "next";
import React from "react";
import { listCategories } from "@/models/category";
import AddProductForm from "@/components/admin/product/new/add-product-form";
import { getProductById } from "@/models/product";

export const metadata: Metadata = {
  title: "Edit Sản phẩm - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) => {
  const categories = await listCategories();
  const product = await getProductById(params.id);
  return (
    <div>
      <AddProductForm categories={categories} product={product} />
    </div>
  );
};

export default Page;
