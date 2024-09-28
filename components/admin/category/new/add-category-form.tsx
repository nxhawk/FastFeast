"use client";
import React from "react";
import CategoryInformation from "./category-information";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/back-button";

const AddCategoryForm = () => {
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");

  return (
    <div>
      <div className="pt-6 pb-2">
        <BackButton />
      </div>
      <form>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Danh mục</h1>
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap flex items-center gap-1 font-medium max-md:hidden"
            type="submit"
          >
            Tạo Danh mục
          </Button>
        </div>
        <div className="flex max-md:flex-col flex-no-wrap gap-5 w-full pt-8">
          <CategoryInformation name={name} slug={slug} setName={setName} setSlug={setSlug} />
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap flex items-center gap-1 font-medium w-fit self-end mt-10 md:hidden"
            type="submit"
          >
            Tạo Danh mục
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
