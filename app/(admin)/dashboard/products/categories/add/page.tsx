import React from "react";
import { type Metadata } from "next";
import AddCategoryForm from "@/components/admin/category/new/add-category-form";

export const metadata: Metadata = {
  title: "Thêm Danh mục - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = () => {
  return (
    <div>
      <AddCategoryForm category={null} />
    </div>
  );
};

export default Page;
