import React from "react";
import ProductItem from "./product-item";
import { type FullProduct } from "@/models/product";

interface Props {
  products?: FullProduct[];
  title: string;
}

const ProductsGrid = ({ products, title }: Props) => {
  return (
    <div>
      <div className="font-bold uppercase text-2xl">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {products?.map((product) => <ProductItem key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductsGrid;
