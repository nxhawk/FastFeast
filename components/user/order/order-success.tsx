"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { MapPin, Phone, User } from "lucide-react";
import SearchOrder from "../search-order";
import { Card, CardContent } from "@/components/ui/card";
import { type AppState } from "@/lib/store";
import { convertToVND } from "@/utils/helper";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const order = useSelector((state: AppState) => state.order);

  return (
    <div className="my-10 flex flex-col items-center gap-10">
      <div className="text-center">
        <div className="text-xl uppercase font-semibold">Đặt hàng thành công</div>
        <p className="text-gray-700">Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất</p>
      </div>
      <div className="flex w-full">
        <div className="max-md:hidden mr-2 lg:mr-5">
          <Image src="/images/food-delivery.png" width={420} height={420} alt="food delivery" />
        </div>
        <div className="flex-1">
          <Card className="max-w-[500px] rounded-md mx-auto">
            <CardContent className="p-3 w-full">
              <div className="text-black text-center font-semibold text-xl">Thông tin Đơn Hàng</div>
              <div className="my-5">
                <ul className="space-y-2">
                  <li className="flex justify-between flex-wrap gap-5">
                    <span className="font-semibold">Mã đơn</span>
                    <span className="font-bold">{order.id}</span>
                  </li>
                  <li className="flex justify-between flex-wrap gap-5">
                    <span className="font-semibold">Tổng tiền</span>
                    <span>{convertToVND(order.totalPrice)}</span>
                  </li>
                  <li className="flex justify-between flex-wrap gap-5">
                    <span className="font-semibold">Thanh toán</span>
                    <span>Ship COD</span>
                  </li>
                </ul>
                <hr className="my-4" />
                <ul className="space-y-2">
                  <li className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-semibold">Họ tên:</span>
                    </div>
                    <span>{order.fullName}</span>
                  </li>
                  <li className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-semibold">Số điện thoại:</span>
                    </div>
                    <span>{order.phoneNumber}</span>
                  </li>
                  <li className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-semibold">Địa chỉ:</span>
                    </div>
                    <span>{order.address}</span>
                  </li>
                </ul>
              </div>
              <div className="w-full mt-10">
                <SearchOrder>
                  <Button variant="destructive" className="w-full">
                    Tra cứu Đơn Hàng
                  </Button>
                </SearchOrder>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
