"use client";
import React from "react";
import { EPaymentType } from "..";
import PaymentCash from "./payment-cash";

interface Props {
  payment: EPaymentType;
  setPayment: React.Dispatch<React.SetStateAction<EPaymentType>>;
}

const PaymentMethod = ({ payment, setPayment }: Props) => {
  return (
    <div className="mt-3">
      <div className="uppercase font-semibold">Hình thức thanh toán</div>
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        <PaymentCash
          icon="/images/cash.svg"
          type={EPaymentType.CASH}
          title="Tiền mặt"
          value={payment}
          setValue={setPayment}
        />
        <PaymentCash
          icon="/images/bank-transfer.svg"
          type={EPaymentType.BANK}
          title="Chuyển khoản"
          value={payment}
          setValue={setPayment}
        />
      </div>
    </div>
  );
};

export default PaymentMethod;
