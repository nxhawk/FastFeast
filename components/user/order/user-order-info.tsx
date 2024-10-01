"use client";
import React from "react";
import { MapPin, PenLine, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputHeader from "@/components/common/input/input-header";
import TextareaHeader from "@/components/common/input/textarea-header";

const UserOrderInfo = () => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [address, setAddress] = React.useState("");

  return (
    <div>
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="uppercase border-b pb-4">Thông tin người nhận</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex max-md:flex-col gap-3 md:justify-between md:items-center w-full">
            <div className="flex-1">
              <InputHeader
                value={phoneNumber}
                setValue={setPhoneNumber}
                placeholder="Số điện thoại"
                icon={<Phone size={14} />}
              />
            </div>
            <div className="flex-1">
              <InputHeader value={fullName} setValue={setFullName} placeholder="Họ tên" icon={<User size={14} />} />
            </div>
          </div>
          <div className="mt-3">
            <InputHeader value={address} setValue={setAddress} placeholder="Địa chỉ" icon={<MapPin size={14} />} />
          </div>
          <div className="mt-3">
            <TextareaHeader
              value={address}
              setValue={setAddress}
              placeholder="Ghi chú đơn hàng"
              icon={<PenLine size={14} />}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOrderInfo;
