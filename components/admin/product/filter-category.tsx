"use client";
import { type Category } from "@prisma/client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  categories: Category[];
}

const FilterCategory = ({ categories }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      onValueChange={(e) => {
        const params = new URLSearchParams(searchParams);
        if (e !== "all") {
          params.set("categoryId", e);
        } else {
          params.delete("categoryId");
        }
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Danh mục" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả Danh mục</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterCategory;
