"use client";
import React from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { type IProductCart } from "@/lib/store/features/cart/type";
import { convertToVND } from "@/utils/helper";
import { addToCart, removeFromCart } from "@/lib/store/features/cart";
import { type AppDispatch } from "@/lib/store";
import { cn } from "@/lib/utils";
import ConfirmDeleteCart from "@/components/common/confirm-delete/confirm-delete-cart";

interface Props {
  product: IProductCart;
}

const ProductCartItem = ({ product }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeProductCount = (count: number) => {
    dispatch(
      addToCart({
        ...product,
        count,
      }),
    );
  };

  const handleDeleteProduct = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className="w-full flex gap-4 border-b pb-2">
      <Image src={product.image} width={100} height={100} alt="product image" />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start py-1">
          <div className="text-sm font-[600] line-clamp-2">{product.name}</div>
          <div className="w-fit">
            <ConfirmDeleteCart handleDelete={handleDeleteProduct} productName={product.name} />
          </div>
        </div>
        <div className="flex justify-between items-center py-1">
          <div className="flex items-center gap-4">
            <button
              className={cn(
                "focus:outline-red-500 p-1 rounded-full border border-red-500",
                product.count <= 1 && "opacity-50",
              )}
              onClick={() => handleChangeProductCount(-1)}
              disabled={product.count <= 1}
            >
              <Minus size={15} className="text-red-500" />
            </button>
            <div className="font-bold text-lg">{product.count}</div>
            <button
              className="focus:outline-red-500 p-1 rounded-full border border-red-500"
              onClick={() => handleChangeProductCount(1)}
            >
              <Plus size={15} className="text-red-500" />
            </button>
          </div>
          <div className="text-red-500 font-semibold">{convertToVND(product.price * product.count)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCartItem;
