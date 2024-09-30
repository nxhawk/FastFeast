import { type Metadata } from "next";
import React from "react";
import ListCategory from "@/components/user/list-category";
import { listCategories } from "@/models/category";
import { listProducts } from "@/models/product";
import ProductSlider from "@/components/user/product/product-slider";

export const metadata: Metadata = {
  title: "Sản phẩm | FastFeast - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = async () => {
  const categories = await listCategories();
  const products = await listProducts("");

  return (
    <div className="relative">
      <ListCategory categories={categories} />
      <div className="pt-28">
        <ProductSlider products={products} title="chicken" />
      </div>
    </div>
  );
};

export default Page;
