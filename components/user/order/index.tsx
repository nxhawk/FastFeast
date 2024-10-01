import React from "react";
import OrderInfor from "./order-infor";
import CartInfor from "./cart-infor";
import { Button } from "@/components/ui/button";

const OrderForm = () => {
  return (
    <div className="flex max-md:flex-col gap-6 pt-8 justify-between">
      <div className="w-7/12 max-md:w-full">
        <OrderInfor />
      </div>
      <div className="w-5/12 max-md:w-full">
        <CartInfor />
        <Button className="uppercase w-full mt-4" variant="destructive">
          đặt hàng
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
