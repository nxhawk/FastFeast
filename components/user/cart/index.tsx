"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ListProduct from "./list-product";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { type AppState } from "@/lib/store";
import { cn } from "@/lib/utils";

const Cart = () => {
  const router = useRouter();
  const totalProducts = useSelector((state: AppState) => state.cart.totalProduct);
  const [storeCartCount, setStoreCartCount] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setStoreCartCount(totalProducts);
    }, 1000);
  }, [totalProducts]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart />
          <div
            className={cn(
              "absolute top-0 right-0 flex rounded-full aspect-square w-4 items-center justify-center bg-red-500 text-white",
              storeCartCount !== totalProducts && "animate-[ping_1s_ease-in-out]",
            )}
          >
            <span className="leading-none text-[9px]">{totalProducts}</span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 max-md:w-full">
        <div className="flex flex-col max-h-dvh min-h-dvh">
          <div className="p-2 border-b shadow">
            <div className="uppercase font-bold">Giỏ hàng</div>
          </div>
          <ListProduct />
          <div className="w-full p-2 pt-1">
            <div className="flex gap-3 pt-4 border-t">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 uppercase font-semibold flex-1 hover:text-red-400"
                >
                  Thêm món
                </Button>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Button
                  variant="destructive"
                  className="font-semibold uppercase flex-1"
                  disabled={totalProducts <= 0}
                  onClick={() => router.push("/checkout")}
                >
                  Thanh toán
                </Button>
              </SheetTrigger>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
