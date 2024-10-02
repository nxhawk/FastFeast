import React from "react";
import StatusOrder from "../status-order";
import PaymentStatus from "../payment-status";
import TableProductOrder from "./table-product-order";
import UserInformation from "./user-information";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FullOrder } from "@/models/order";
import { formateDate } from "@/utils/helper";

interface Props {
  order: FullOrder | null;
}

const OrderInformation = ({ order }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap gap-1 justify-between items-center">
          <p className="font-semibold tracking-tight group flex items-center gap-2 text-lg">Mã đơn: {order?.id}</p>
          <p className="text-sm text-muted-foreground font-medium">{formateDate(order?.createdAt)}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex flex-col gap-8">
          {order?.items && order?.items.length > 0 && (
            <TableProductOrder products={order?.items} totalPrice={order.totalPrice} />
          )}
        </div>
        <div>
          {order?.id && (
            <UserInformation
              orderId={order?.id}
              user={{
                fullName: order?.fullName || "",
                address: order?.address || "",
                phoneNumber: order?.phoneNumber || "",
                note: order?.note || "",
              }}
            />
          )}
        </div>
        <div className="text-sm space-y-1 mt-6">
          <div className="flex gap-1">
            <div className="font-semibold mr-1 w-28">Tình trạng đơn:</div>
            {order?.status && <StatusOrder status={order?.status} />}
          </div>
          <div className="flex gap-1">
            <div className="font-semibold mr-1 w-28">Thanh toán:</div>
            {order?.paymentMethod && <PaymentStatus status={order.paymentMethod} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInformation;
