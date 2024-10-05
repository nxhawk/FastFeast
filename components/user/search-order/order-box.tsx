import React from "react";
import { convertToVND, formateDate } from "@/utils/helper";
import StatusOrder from "@/components/admin/order/status-order";
import { type FullOrder } from "@/models/order";

interface Props {
  order: FullOrder;
}

const OrderBox = ({ order }: Props) => {
  return (
    <div className="border rounded-lg p-3 text-sm space-y-2">
      <div className="flex items-center justify-between">
        <p>{formateDate(order.createdAt)}</p>
        <StatusOrder status={order.status} />
      </div>
      <div>
        {order.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between">
            <div className="flex-1 overflow-clip">
              {item.quantity} x {item.product.name}
            </div>
            <div className="w-20 text-end">{convertToVND(item.product.price)}</div>
          </div>
        ))}
      </div>
      <div className="text-sm">
        <div className="flex gap-1">
          <p className="font-bold">Thanh tiền:</p>
          <p className="">{convertToVND(order.totalPrice)}</p>
        </div>
        <div className="flex gap-1">
          <p className="font-bold">Mã đơn:</p>
          <p
            className="bg-slate-300 px-1.5 rounded cursor-pointer"
            onClick={() => navigator.clipboard.writeText(order.id + "")}
          >
            {order.id}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="font-bold">Thanh toán:</p>
          <p className="">Ship COD</p>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
