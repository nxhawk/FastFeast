import React from "react";
import { type Category } from "@prisma/client";
import ProductByCategory from "./product-by-category";

interface Props {
  categories: Category[];
  categoryId: string;
}

const ListProductHome = async ({ categories, categoryId }: Props) => {
  const category = categories.find((c) => c.id === categoryId);

  return (
    <div>
      {category ? (
        <ProductByCategory category={category} showAll={true} />
      ) : (
        <>
          {categories.map((cate) => (
            <ProductByCategory key={cate.id} category={cate} />
          ))}
        </>
      )}
    </div>
  );
};

export default ListProductHome;
