"use client";
import React from "react";
import { usePathname } from "next/navigation";
import OrderSuccess from "./order-success";
import OrderForm from ".";

const OrderPage = () => {
  const [isOrder, setIsOrder] = React.useState(true);
  const pathName = usePathname();
  React.useEffect(() => {
    setIsOrder(true);
  }, [pathName]);

  return <div>{isOrder ? <OrderForm setIsOrder={setIsOrder} /> : <OrderSuccess />}</div>;
};

export default OrderPage;
