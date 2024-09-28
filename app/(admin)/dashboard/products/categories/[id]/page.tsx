import React from "react";
import { type Metadata } from "next";
import { unstable_cache } from "next/cache";
import AddCategoryForm from "@/components/admin/category/new/add-category-form";
import { getCategoryById } from "@/models/category";

export const metadata: Metadata = {
  title: "Edit Danh mục - Fast Food Ordering website",
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
  const getCategory = unstable_cache(
    async (id: string) => {
      return getCategoryById(id);
    },
    [`category-${params.id}`],
    { tags: [`category-${params.id}`] },
  );
  const category = await getCategory(params.id);

  return (
    <div>
      <AddCategoryForm category={category} />
    </div>
  );
};

export default Page;
