"use client";
import React from "react";
import Image from "next/image";
import { CircleCheck, LoaderCircle } from "lucide-react";
import OrderBox from "./order-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { type FullOrder, getAllOrderById } from "@/models/order";
import { cn } from "@/lib/utils";

const SearchOrder = ({ children }: { children: React.ReactNode }) => {
  const [searchKey, setSearchKey] = React.useState("");
  const [storeSearchKey, setStoreSearchKey] = React.useState("");
  const [ordersResults, setOrderResults] = React.useState<FullOrder[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFirst, setIsFirst] = React.useState(true);

  const handleSearchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const orders = await getAllOrderById(searchKey);
      setOrderResults(orders);
    } catch (error) {
      setOrderResults([]);
    } finally {
      setIsLoading(false);
      setIsFirst(false);
    }
    setStoreSearchKey(searchKey);
    setSearchKey("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0 max-md:w-full">
        <div className="flex flex-col max-h-dvh min-h-dvh">
          <div className="p-2 border-b shadow">
            <div className="uppercase font-bold">Tra cứu đơn hàng</div>
          </div>
          <form className="flex gap-1 p-2 mt-4" onSubmit={handleSearchOrder}>
            <Input
              placeholder="Số điện thoại hoặc mã đơn hàng"
              value={searchKey}
              required
              onChange={(e) => setSearchKey(e.target.value)}
              disabled={isLoading}
            />
            <Button variant="destructive" type="submit" disabled={isLoading} className="flex items-center gap-1">
              Tìm kiếm
              {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            </Button>
          </form>
          {isFirst && (
            <div className="flex flex-col items-center mt-3 gap-4 p-2">
              <Image src={"/images/tra-cuu.svg"} width={100} height={100} alt="tra cuu image" />
              <div className="text-gray-600 text-center mb-20">
                Nhập số điện thoại/mã đơn để kiểm tra tình trạng đơn hàng
              </div>
            </div>
          )}
          {!isFirst && (
            <div className="p-2 pt-0">
              <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                <CircleCheck className="w-4 h-4" />
                Đã tìm thấy {ordersResults.length} đơn hàng với "{storeSearchKey}"
              </div>
            </div>
          )}
          <div
            className={cn("space-y-3 flex-1 overflow-y-scroll p-2 pt-0 mb-2", isLoading && "opacity-50")}
            id="style-2"
          >
            {ordersResults.map((order) => (
              <OrderBox key={order.id} order={order} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchOrder;
