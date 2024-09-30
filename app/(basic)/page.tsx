import { type Metadata } from "next";
import React from "react";
import ListCategory from "@/components/user/list-category";
import { listCategories } from "@/models/category";
import ListProductHome from "@/components/user/product/list-product-home";

export const metadata: Metadata = {
  title: "Sản phẩm | FastFeast - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = async ({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) => {
  const categoryId = searchParams?.categoryId ? decodeURI(searchParams?.categoryId as string) : "";

  const categories = await listCategories();

  return (
    <div className="relative">
      <ListCategory categories={categories} categoryId={categoryId} isClose={false} />
      <div className="pt-28">
        <ListProductHome categories={categories} categoryId={categoryId} />
      </div>
    </div>
  );
};

export default Page;
