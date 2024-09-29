import { type Category } from "@prisma/client";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  categories: Category[];
}

const ListCategory = ({ categories }: Props) => {
  return (
    <div className="fixed top-[65px] left-0 w-full bg-white">
      <div className="bg-red-50">
        <div className="max-w-screen-lg max-md:text-sm mx-auto py-2 px-1">
          <span>Ngoài khung giờ hoạt động của nhà hàng. Giờ hoạt động: </span>
          <b className="text-red-500">8:30 - 21:00</b>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto mt-2 px-1 pb-1">
        <div className="flex gap-2 overflow-x-auto">
          <Button variant={"secondary"} className="font-medium">
            Tất cả
          </Button>
          {categories.map((category) => (
            <Button variant={"secondary"} key={category.id} className="font-medium">
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
