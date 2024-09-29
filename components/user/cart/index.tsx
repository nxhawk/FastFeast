"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { convertToVND } from "@/utils/helper";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart />
          <div className="absolute top-0 right-0 flex rounded-full aspect-square w-4 items-center justify-center bg-red-500 text-white">
            <span className="leading-none text-[9px]">0</span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="min-h-screen max-h-screen flex flex-col">
        <SheetHeader className="h-fit">
          <SheetTitle className="uppercase">Giỏ hàng</SheetTitle>
        </SheetHeader>
        <div className="h-[410px] flex flex-col mt-2">
          <div className="overflow-y-auto w-full h-full">
            <div className="text-center text-gray-60">
              Giỏ hàng đang trống. Vui lòng quay lại trang chủ để tiếp tục mua hàng.
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat corporis assumenda omnis iste repudiandae
              repellat, voluptatem harum debitis quos culpa tempora distinctio saepe sint rem deleniti laboriosam.{" "}
            </div>
          </div>
        </div>
        <div className="w-full h-fit">
          <div>
            <div className="border-t w-full py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="font-bold">TỔNG</div>
                <Badge variant="destructive" className="text-sm">
                  10 món
                </Badge>
              </div>
              <div className="font-bold text-xl flex-1 text-end">{convertToVND(2000000)}</div>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 uppercase font-semibold flex-1 hover:text-red-400"
            >
              Thêm món
            </Button>
            <Button variant="destructive" className="font-semibold uppercase flex-1">
              Thanh toán
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
