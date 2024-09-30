"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import ProductCartItem from "./product-cart-item";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { convertToVND } from "@/utils/helper";
import { type AppState } from "@/lib/store";

const Cart = () => {
  const products = useSelector((state: AppState) => state.cart.products);
  const totalProducts = useSelector((state: AppState) => state.cart.totalProduct);
  const calcTotalPrice = () => {
    let totalPrice = 0;
    products.map((product) => (totalPrice += product.price * product.count));
    return totalPrice;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart />
          <div className="absolute top-0 right-0 flex rounded-full aspect-square w-4 items-center justify-center bg-red-500 text-white">
            <span className="leading-none text-[9px]">{totalProducts}</span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <div className="flex flex-col max-h-screen min-h-screen">
          <div className="p-2 border-b shadow">
            <div className="uppercase font-bold">Giỏ hàng</div>
          </div>
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
          <div className="w-full p-2 pt-1">
            <div>
              <div className="border-t w-full py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="font-bold">TỔNG</div>
                  <Badge variant="destructive" className="text-sm">
                    {totalProducts} món
                  </Badge>
                </div>
                <div className="font-bold text-xl flex-1 text-end">{convertToVND(calcTotalPrice())}</div>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 uppercase font-semibold flex-1 hover:text-red-400"
                >
                  Thêm món
                </Button>
              </SheetTrigger>
              <Button variant="destructive" className="font-semibold uppercase flex-1" disabled={totalProducts <= 0}>
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
