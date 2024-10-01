import { type EPaymentType } from "@/components/user/order";

export interface IOldOrder {
  id: string;
  totalPrice: number;
  paymentMethod: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}
