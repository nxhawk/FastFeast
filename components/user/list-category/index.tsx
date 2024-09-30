"use client";
import { type Category } from "@prisma/client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  categories: Category[];
  categoryId: string;
  isClose?: boolean;
}

const ListCategory = ({ categories, categoryId, isClose = false }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const changeRouter = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId !== "all") {
      params.set("categoryId", categoryId);
    } else {
      params.delete("categoryId");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="fixed top-[65px] left-0 w-full bg-white z-[3]">
      {isClose && (
        <div className="bg-red-50">
          <div className="max-w-screen-lg max-md:text-sm mx-auto px-1 py-0.5">
            <span>Ngoài khung giờ hoạt động của nhà hàng. Giờ hoạt động: </span>
            <b className="text-red-500">8:30 - 21:00</b>
          </div>
        </div>
      )}
      <div className="max-w-screen-lg mx-auto mt-2 px-1 pb-1">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Button
            variant={categoryId === "" ? "destructive" : "secondary"}
            className="font-medium"
            onClick={() => changeRouter("all")}
          >
            Tất cả
          </Button>
          {categories.map((category) => (
            <Button
              variant={categoryId === category.id ? "destructive" : "secondary"}
              key={category.id}
              onClick={() => changeRouter(category.id)}
              className="font-medium"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
