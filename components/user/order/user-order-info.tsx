"use client";
import React from "react";
import { MapPin, PenLine, Phone, User } from "lucide-react";
import { type FormikProps } from "formik";
import { type IUserOrder } from ".";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputHeader from "@/components/common/input/input-header";
import TextareaHeader from "@/components/common/input/textarea-header";

interface Props {
  formik: FormikProps<IUserOrder>;
}

const UserOrderInfo = ({ formik }: Props) => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="uppercase border-b pb-4">Thông tin người nhận</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex max-md:flex-col gap-3 md:justify-between md:items-start w-full">
            <div className="flex-1">
              <InputHeader
                value={formik.values.phoneNumber}
                setValue={formik.handleChange("phoneNumber")}
                placeholder="Số điện thoại"
                icon={<Phone size={14} />}
              />
              <div className="text-red-500 text-sm">{formik.touched.phoneNumber && formik.errors.phoneNumber}</div>
            </div>
            <div className="flex-1">
              <InputHeader
                value={formik.values.fullName}
                setValue={formik.handleChange("fullName")}
                placeholder="Họ tên"
                icon={<User size={14} />}
              />
              <div className="text-red-500 text-sm">{formik.touched.fullName && formik.errors.fullName}</div>
            </div>
          </div>
          <div className="mt-3">
            <InputHeader
              value={formik.values.address}
              setValue={formik.handleChange("address")}
              placeholder="Địa chỉ"
              icon={<MapPin size={14} />}
            />
            <div className="text-red-500 text-sm">{formik.touched.address && formik.errors.address}</div>
          </div>
          <div className="mt-3">
            <TextareaHeader
              value={formik.values.note}
              setValue={formik.handleChange("note")}
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
