import { type Category } from "@prisma/client";
import React from "react";
import ProductSlider from "./product-slider";
import ProductsGrid from "./products-grid";
import { listProducts } from "@/models/product";

interface Props {
  category: Category;
  showAll?: boolean;
}

const ProductByCategory = async ({ category, showAll = false }: Props) => {
  const products = await listProducts(category.id);
  return (
    <div className="mb-5">
      {showAll ? (
        <ProductsGrid products={products} title={category.name} />
      ) : (
        <ProductSlider products={products} title={category.name} categoryId={category.id} />
      )}
    </div>
  );
};

export default ProductByCategory;
