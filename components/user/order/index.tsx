"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Loading } from "notiflix";
import CartInfor from "./cart-infor";
import UserOrderInfo from "./user-order-info";
import PaymentMethod from "./payment/payment-method";
import { Button } from "@/components/ui/button";
import { type AppDispatch, type AppState } from "@/lib/store";
import { vietnamPhoneNumberRegex } from "@/utils/helper";
import { createOrder } from "@/models/order";
import { clearCart } from "@/lib/store/features/cart";
import { storeOrder } from "@/lib/store/features/order";

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

const OrderForm = ({ setIsOrder }: { setIsOrder: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: AppState) => state.cart.products);
  const totalProducts = useSelector((state: AppState) => state.cart.totalProduct);
  const oldOrder = useSelector((state: AppState) => state.order);

  const [payment, setPayment] = React.useState<EPaymentType>(EPaymentType.CASH);

  const calcTotalPrice = () => {
    let totalPrice = 0;
    products.map((product) => (totalPrice += product.price * product.count));
    return totalPrice;
  };

  const formik = useFormik<IUserOrder>({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: oldOrder.phoneNumber,
      fullName: oldOrder.fullName,
      address: oldOrder.address,
      note: "",
    },
    validationSchema: OrderSchema,
    onSubmit: async (values) => {
      Loading.hourglass();
      try {
        const order = await createOrder(values, calcTotalPrice(), products);
        dispatch(
          storeOrder({
            id: order.id,
            totalPrice: order.totalPrice,
            paymentMethod: payment,
            fullName: order.fullName,
            phoneNumber: order.phoneNumber,
            address: order.address,
          }),
        );
        dispatch(clearCart());
        toast.success("Đặt hàng thành công");
        setIsOrder(false);
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      }
      Loading.remove();
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
