"use client";
import React from "react";
import { useSelector } from "react-redux";
import CartInfor from "./cart-infor";
import UserOrderInfo from "./user-order-info";
import PaymentMethod from "./payment/payment-method";
import { Button } from "@/components/ui/button";
import { type AppState } from "@/lib/store";

export interface IUserOrder {
  phoneNumber: string;
  fullName: string;
  address: string;
  note: string;
}

export enum EPaymentType {
  CASH = "cash",
  BANK = "bank",
}

const OrderForm = () => {
  const products = useSelector((state: AppState) => state.cart.products);
  const totalProducts = useSelector((state: AppState) => state.cart.totalProduct);

  const [userOrderInfo, setUserOrderInfo] = React.useState<IUserOrder>({
    phoneNumber: "",
    fullName: "",
    address: "",
    note: "",
  });
  const [payment, setPayment] = React.useState<EPaymentType>(EPaymentType.CASH);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userOrderInfo);
  };

  return (
    <form className="flex max-md:flex-col gap-6 pt-8 justify-between" onSubmit={handleCreateOrder}>
      <div className="w-7/12 max-md:w-full">
        <div className="flex flex-col gap-5">
          <UserOrderInfo userOrderInfo={userOrderInfo} setUserOrderInfo={setUserOrderInfo} />
          <PaymentMethod payment={payment} setPayment={setPayment} />
        </div>
      </div>
      <div className="w-5/12 max-md:w-full">
        <CartInfor />
        <Button type="submit" className="uppercase w-full mt-4" variant="destructive" disabled={totalProducts <= 0}>
          đặt hàng
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
