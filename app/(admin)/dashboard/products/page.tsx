import { type Metadata } from "next";
import React from "react";
import ProductHeader from "@/components/admin/product-header";
import { listProducts } from "@/models/product";
import ProductTable from "@/components/admin/product/product-table";
import { listCategories } from "@/models/category";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = async ({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) => {
  const products = await listProducts(searchParams?.categoryId ? decodeURI(searchParams?.categoryId as string) : "");
  const categories = await listCategories();

  return (
    <div>
      <ProductHeader />
      <ProductTable products={products} categories={categories} />
    </div>
  );
};

export default Page;
