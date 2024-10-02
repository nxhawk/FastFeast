"use client";
import React from "react";
import OrderInformation from "./order-information";
import ChangeOrderStatusForm from "./change-order-status-form";
import BackButton from "@/components/common/back-button";
import { type FullOrder } from "@/models/order";

interface Props {
  order: FullOrder | null;
}

const EditOrderForm = ({ order }: Props) => {
  return (
    <div>
      <div className="pt-6 pb-4">
        <BackButton />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Đơn hàng</h1>
        </div>
        <div className="flex max-md:flex-col gap-5 w-full pt-8">
          <div className="w-full md:w-4/6 flex flex-col max-md:gap-4">
            <OrderInformation order={order} />
          </div>
          <div className="w-full md:w-2/6">
            {order && (
              <ChangeOrderStatusForm paymentMethod={order.paymentMethod} orderState={order.status} orderId={order.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrderForm;
