"use client";
import React from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import CartInfor from "./cart-infor";
import UserOrderInfo from "./user-order-info";
import PaymentMethod from "./payment/payment-method";
import { Button } from "@/components/ui/button";
import { type AppState } from "@/lib/store";
import { vietnamPhoneNumberRegex } from "@/utils/helper";

export interface IUserOrder {
  phoneNumber: string;
  fullName: string;
  address: string;
  note: string;
}

export enum EPaymentType {
  CASH = "cash",
  BANK = "bank",
}

const OrderSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Số điện thoại bắt buộc")
    .matches(vietnamPhoneNumberRegex, "Số điện thoại không hợp lệ"),
  fullName: yup.string().required("Họ tên ít nhất 2 kí tự").min(2, "Họ tên ít nhất 2 kí tự"),
  address: yup.string().required("Địa chỉ ít nhất 8 kí tự").min(8, "Địa chỉ ít nhất 8 kí tự"),
  note: yup.string(),
});

const OrderForm = () => {
  const products = useSelector((state: AppState) => state.cart.products);
  const totalProducts = useSelector((state: AppState) => state.cart.totalProduct);

  const [payment, setPayment] = React.useState<EPaymentType>(EPaymentType.CASH);

  const formik = useFormik<IUserOrder>({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: "",
      fullName: "",
      address: "",
      note: "",
    },
    validationSchema: OrderSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <form className="flex max-md:flex-col gap-6 pt-8 justify-between" onSubmit={formik.handleSubmit}>
      <div className="w-7/12 max-md:w-full">
        <div className="flex flex-col gap-5">
          <UserOrderInfo formik={formik} />
          <PaymentMethod payment={payment} setPayment={setPayment} />
        </div>
      </div>
      <div className="w-5/12 max-md:w-full">
        <CartInfor />
        <Button type="submit" className="uppercase w-full mt-4" variant="destructive" disabled={totalProducts <= 0}>
          đặt hàng
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
