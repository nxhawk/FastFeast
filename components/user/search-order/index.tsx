"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const SearchOrder = ({ children }: { children: React.ReactNode }) => {
  const [searchKey, setSearchKey] = React.useState("");
  const handleSearchOrder = () => {};

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="uppercase">Tra cứu đơn hàng</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 mt-2">
          <div className="flex gap-1">
            <Input
              placeholder="Số điện thoại hoặc mã đơn hàng"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <Button variant="destructive" onClick={handleSearchOrder}>
              Tìm kiếm
            </Button>
          </div>
          <div className="flex flex-col items-center mt-3 gap-4">
            <Image src={"/images/tra-cuu.svg"} width={100} height={100} alt="tra cuu image" />
            <div className="text-gray-600 text-center mb-20">
              Nhập số điện thoại/mã đơn để kiểm tra tình trạng đơn hàng
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchOrder;
