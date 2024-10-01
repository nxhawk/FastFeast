"use client";
import React from "react";
import { useSelector } from "react-redux";
import ProductCartItem from "./product-cart-item";
import { Badge } from "@/components/ui/badge";
import { convertToVND } from "@/utils/helper";
import { type AppState } from "@/lib/store";

const ListProduct = () => {
  const products = useSelector((state: AppState) => state.cart.products);
  const totalProducts = useSelector((state: AppState) => state.cart.totalProduct);
  const calcTotalPrice = () => {
    let totalPrice = 0;
    products.map((product) => (totalPrice += product.price * product.count));
    return totalPrice;
  };

  return (
    <>
      <div className="flex-1 flex flex-col mt-2 overflow-y-auto px-1">
        <div className="overflow-y-auto flex flex-col" id="style-2">
          {products.length <= 0 ? (
            <div className="text-center text-gray-400 mt-5">
              Giỏ hàng đang trống. Vui lòng quay lại trang chủ để tiếp tục mua hàng.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {products.map((product) => (
                <ProductCartItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full p-2 py-1">
        <div className="border-t w-full pt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="font-bold">TỔNG</div>
            <Badge variant="destructive" className="text-sm">
              {totalProducts} món
            </Badge>
          </div>
          <div className="font-bold text-xl flex-1 text-end">{convertToVND(calcTotalPrice())}</div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
