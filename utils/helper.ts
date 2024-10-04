import { OrderState, Status } from "@prisma/client";
import moment from "moment";

export function convertOrderStatusToInfo(state: OrderState) {
  switch (state) {
    case OrderState.NEW_ORDER:
      return {
        name: "Đơn hàng mới",
        className: "bg-blue-500 text-white",
      };
    case OrderState.CONFIRMED:
      return {
        name: "Đã xác nhận",
        className: "border border-orange-200 bg-orange-50 text-orange-600",
      };
    case OrderState.PROCESSING:
      return {
        name: "Đang chế biến",
        className: "border border-orange-200 bg-orange-50 text-orange-600",
      };
    case OrderState.DELIVERING:
      return {
        name: "Đang  giao hàng",
        className: "border border-orange-200 bg-orange-50 text-orange-600",
      };
    case OrderState.COMPLETED:
      return {
        name: "Hoàn tất",
        className: "bg-green-500 text-white",
      };
    default:
      return {
        name: "Đơn hủy",
        className: "bg-red-500 text-white",
      };
  }
}

export const vietnamPhoneNumberRegex = /^(0)(3|5|7|8|9)([0-9]{8})$/;

export function statusToTitle(status: Status) {
  type TVariant = "secondary" | "destructive" | "default";
  if (status === Status.DRAFT)
    return {
      title: "Nháp",
      variant: "secondary" as TVariant,
    };
  if (status === Status.PUBLIC)
    return {
      title: "Công khai",
      variant: "default" as TVariant,
    };
  if (status === Status.OUTSTOCK)
    return {
      title: "Hết hàng",
      variant: "destructive" as TVariant,
    };
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function formateDate(date: string | number | Date | undefined) {
  return moment(date).format("HH:mm:ss DD/MM/YYYY");
}

export function formateDateSearchParam(date: string | number | Date | undefined) {
  return moment(date).format("YYYY-MM-DD");
}

export function convertToVND(money: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(money);
}

export function toSlug(str: string) {
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize("NFD") // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, "-");

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, "");

  return str;
}
