"use client";
import React from "react";
import { OrderState, PaymentMethod } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateOrderStatus } from "@/models/order";

const orderStatus = [
  {
    key: OrderState.NEW_ORDER,
    name: "Đơn hàng mới",
  },
  {
    key: OrderState.CONFIRMED,
    name: "Đã xác nhận",
  },
  {
    key: OrderState.PROCESSING,
    name: "Đang chế biến",
  },
  {
    key: OrderState.DELIVERING,
    name: "Đang giao hàng",
  },
  {
    key: OrderState.COMPLETED,
    name: "Hoàn tất",
  },
  {
    key: OrderState.CANCELLED,
    name: "Đơn hủy",
  },
];

const paymentStatus = [
  {
    key: PaymentMethod.CASH,
    name: "Chưa thanh toán",
  },
  {
    key: PaymentMethod.BANK,
    name: "Đã thanh toán",
  },
];

interface Props {
  paymentMethod: PaymentMethod;
  orderState: OrderState;
  orderId: string;
}

const ChangeOrderStatusForm = ({ paymentMethod, orderState, orderId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [changeOrderStatus, setChangeOrderStatus] = React.useState<OrderState>(orderState);
  const [changePaymentStatus, setChangePaymentStatus] = React.useState<PaymentMethod>(paymentMethod);
  const [note, setNote] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateOrderStatus(orderId, changeOrderStatus, changePaymentStatus);
      toast.success("Cập nhật đơn hàng thành công");
      router.refresh();
    } catch (error) {
      toast.error("Error");
    }
    setIsLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Card>
        <CardContent className="py-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <Label htmlFor="status" className="md:w-40">
                Tình trạng đơn hàng
              </Label>
              <Select
                onValueChange={(e: OrderState) => setChangeOrderStatus(e)}
                value={changeOrderStatus}
                defaultValue={OrderState.NEW_ORDER}
                required
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified order status to display" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatus.map((status) => (
                    <SelectItem key={status.key} value={status.key}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="payment" className="md:w-40">
                Thanh toán
              </Label>
              <Select
                onValueChange={(e: PaymentMethod) => setChangePaymentStatus(e)}
                value={changePaymentStatus}
                defaultValue={PaymentMethod.CASH}
                required
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified payment status to display" />
                </SelectTrigger>
                <SelectContent>
                  {paymentStatus.map((status) => (
                    <SelectItem key={status.key} value={status.key}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="admin-note" className="md:w-40">
                Admin Note
              </Label>
              <Textarea
                placeholder="Ghi chú dành cho riêng admin..."
                className="h-20"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Button
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap flex items-center gap-1 font-medium w-full"
        type="submit"
        disabled={isLoading}
      >
        Cập nhật
      </Button>
    </form>
  );
};

export default ChangeOrderStatusForm;
