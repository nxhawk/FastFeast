"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { type Category } from "@prisma/client";
import CategoryInformation from "./category-information";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/back-button";
import { newCategory, updateCategory } from "@/models/category";

interface Props {
  category: Category | null;
}

const AddCategoryForm = ({ category }: Props) => {
  const [name, setName] = React.useState(category?.name ?? "");
  const [slug, setSlug] = React.useState(category?.slug ?? "");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const updateOneCategory = async () => {
    try {
      setIsLoading(true);
      await updateCategory(category?.id || "", name, slug);
      toast.success("Cập nhật category thành công");
      // redirect to list category page
      router.push("/dashboard/products/categories");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const addNewCategory = async () => {
    try {
      setIsLoading(true);
      await newCategory(name, slug);
      toast.success("Thêm category thành công");
      //redirect to list category page
      router.push("/dashboard/products/categories");
    } catch (error) {
      toast.error("Category này đã tồn tại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // add new slug
    if (category) {
      await updateOneCategory();
    } else {
      await addNewCategory();
    }
  };

  return (
    <div>
      <div className="pt-6 pb-2">
        <BackButton />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Danh mục</h1>
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap flex items-center gap-1 font-medium max-md:hidden"
            type="submit"
            disabled={isLoading}
          >
            {category ? "Cập nhật" : "Tạo Danh mục"}
          </Button>
        </div>
        <div className="flex max-md:flex-col flex-no-wrap gap-5 w-full pt-8">
          <CategoryInformation name={name} slug={slug} setName={setName} setSlug={setSlug} isLoading={isLoading} />
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap flex items-center gap-1 font-medium w-fit self-end mt-10 md:hidden"
            type="submit"
            disabled={isLoading}
          >
            {category ? "Cập nhật" : "Tạo Danh mục"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
