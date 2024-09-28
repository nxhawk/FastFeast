"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../common/button";

const ProductHeader = () => {
  const router = useRouter();
  const navigateToAdd = () => {
    router.push("/dashboard/products/add");
  };
  return (
    <div className="py-8 flex items-center justify-between">
      <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Sản Phẩm</h1>
      <Button func={navigateToAdd}>
        Thêm Sản Phẩm
        <Plus size={17} />
      </Button>
    </div>
  );
};

export default ProductHeader;
