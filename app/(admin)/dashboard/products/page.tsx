import { type Metadata } from "next";
import React from "react";
import ProductHeader from "@/components/admin/product-header";
import { listProducts } from "@/models/product";
import ProductTable from "@/components/admin/product/product-table";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = async () => {
  const products = await listProducts();
  return (
    <div>
      <ProductHeader />
      <ProductTable products={products} />
    </div>
  );
};

export default Page;
