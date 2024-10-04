import { PaymentMethod, type Order } from "@prisma/client";
import { type Table } from "@tanstack/react-table";
import React from "react";

import { Activity, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { convertToVND } from "@/utils/helper";

interface Props {
  table: Table<Order>;
}

const ListBoxStatistic1 = ({ table }: Props) => {
  const calculatedTotalPrice = (state: PaymentMethod | null) => {
    let result = 0;
    let count = 0;
    table.getRowModel().rows.map((row) => {
      if (!state || row.original.paymentMethod === state) {
        result += row.original.totalPrice;
        count++;
      }
    });
    return {
      total: result,
      quantity: count,
    };
  };

  return (
    <div className="flex gap-3 md:gap-5 flex-wrap max-md:flex-col">
      <Card className="w-full md:w-[250px]">
        <CardContent className="py-5">
          <div className="flex justify-between items-center text-sm">
            <div>Tổng ước tính</div>
            <DollarSign className="w-4 h-4 text-gray-500" />
          </div>
          <p className="font-black text-xl mt-1">{convertToVND(calculatedTotalPrice(null).total)}</p>
          <p className="text-xs text-gray-500">{calculatedTotalPrice(null).quantity} đơn</p>
        </CardContent>
      </Card>
      <Card className="w-full md:w-[250px]">
        <CardContent className="py-5">
          <div className="flex justify-between items-center text-sm">
            <div>Chưa thanh toán</div>
            <Activity className="w-4 h-4 text-gray-500" />
          </div>
          <p className="font-black text-xl mt-1">{convertToVND(calculatedTotalPrice(PaymentMethod.CASH).total)}</p>
          <p className="text-xs text-gray-500">{calculatedTotalPrice(PaymentMethod.CASH).quantity} đơn</p>
        </CardContent>
      </Card>
      <Card className="w-full md:w-[250px]">
        <CardContent className="py-5">
          <div className="flex justify-between items-center text-sm">
            <div>Đã thanh toán</div>
            <Activity className="w-4 h-4 text-gray-500" />
          </div>
          <p className="font-black text-xl mt-1">{convertToVND(calculatedTotalPrice(PaymentMethod.BANK).total)}</p>
          <p className="text-xs text-gray-500">{calculatedTotalPrice(PaymentMethod.BANK).quantity} đơn</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListBoxStatistic1;
