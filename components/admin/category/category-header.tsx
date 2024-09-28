"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button";

const CategoryHeader = () => {
  const router = useRouter();
  const navigateToAdd = () => {
    router.push("/dashboard/products/categories/add");
  };
  return (
    <div className="py-8 flex items-center justify-between">
      <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Danh mục Sản Phẩm</h1>
      <Button func={navigateToAdd}>
        Thêm Danh mục
        <Plus size={17} />
      </Button>
    </div>
  );
};

export default CategoryHeader;
