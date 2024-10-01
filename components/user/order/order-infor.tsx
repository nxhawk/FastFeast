"use client";
import React from "react";
import UserOrderInfo from "./user-order-info";
import PaymentMethod from "./payment/payment-method";

const OrderInfor = () => {
  return (
    <div className="flex flex-col gap-5">
      <UserOrderInfo />
      <PaymentMethod />
    </div>
  );
};

export default OrderInfor;
