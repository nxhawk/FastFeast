"use client";
import React from "react";
import Link from "next/link";
import ListProduct from "../cart/list-product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CartInfor = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-1">
        <CardTitle className="border-b pb-3 flex justify-between items-center">
          <div className="uppercase">Giỏ hàng</div>
          <Link href={"/"}>
            <Button
              variant="outline"
              className="text-red-500 border-red-500 uppercase text-xs hover:text-red-400"
              size="sm"
            >
              thêm món
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[24rem] flex flex-col">
        <ListProduct />
      </CardContent>
    </Card>
  );
};

export default CartInfor;
