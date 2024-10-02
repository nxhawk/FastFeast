"use client";
import React from "react";
import { useFormik } from "formik";
import { MapPin, PencilLine, Phone, User } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { type IUserOrder, OrderSchema } from "@/components/user/order";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateInfoUserOrder } from "@/models/order";

interface Props {
  user: IUserOrder;
  orderId: string;
}

const UserInformation = ({ user, orderId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik<IUserOrder>({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      address: user.address,
      note: user.note,
    },
    validationSchema: OrderSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await updateInfoUserOrder(orderId, values);
        toast.success("Cập nhật thành công");
        router.refresh();
      } catch (error) {
        toast.error("Error");
      }
      setIsLoading(false);
    },
  });
  const [isUpdate, setIsUpdate] = React.useState(false);

  const handleChangeStateForm = (currentState: boolean) => {
    if (currentState) {
      formik.setValues({
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        address: user.address,
        note: user.note,
      });
    }
    setIsUpdate(!currentState);
  };

  return (
    <form
      className="text-sm mt-5 rounded-lg p-3 bg-red-50 border border-red-100 relative"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex items-center gap-1 justify-between mb-5">
        <div className="text-gray-700">Địa chỉ nhận hàng</div>
        <div className="flex gap-1 items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleChangeStateForm(isUpdate)}
            disabled={isLoading}
          >
            {isUpdate ? "Hủy" : "Sửa"}
          </Button>
          {isUpdate && (
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap flex items-center gap-1 font-medium"
              type="submit"
              disabled={isLoading}
            >
              Cập nhật
            </Button>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        <li className="flex gap-2">
          <div className="flex items-center gap-2 w-28">
            <User className="w-4 h-4" />
            <span>Họ tên:</span>
          </div>
          {isUpdate ? (
            <div className="flex flex-col flex-1">
              <Input
                placeholder="Họ tên"
                value={formik.values.fullName}
                onChange={formik.handleChange("fullName")}
                className="flex-1 py-2"
                disabled={isLoading}
              />
              <p className="text-red-500 text-xs mt-1">{formik.touched.fullName && formik.errors.fullName}</p>
            </div>
          ) : (
            <div>{user.fullName}</div>
          )}
        </li>
        <li className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 w-28">
            <Phone className="w-4 h-4" />
            <span>Số điện thoại:</span>
          </div>
          {isUpdate ? (
            <div className="flex flex-col flex-1">
              <Input
                placeholder="Số điện thoại"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange("phoneNumber")}
                className="flex-1 py-2"
                disabled={isLoading}
              />
              <p className="text-red-500 text-xs mt-1">{formik.touched.phoneNumber && formik.errors.phoneNumber}</p>
            </div>
          ) : (
            <div>{user.phoneNumber}</div>
          )}
        </li>
        <li className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 w-28">
            <MapPin className="w-4 h-4" />
            <span>Địa chỉ:</span>
          </div>
          {isUpdate ? (
            <div className="flex flex-col flex-1">
              <Input
                placeholder="Địa chỉ"
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                className="flex-1 py-2"
                disabled={isLoading}
              />
              <p className="text-red-500 text-xs mt-1">{formik.touched.address && formik.errors.address}</p>
            </div>
          ) : (
            <div>{user.address}</div>
          )}
        </li>
        <li className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 w-28">
            <PencilLine className="w-4 h-4" />
            <span>Ghi chú:</span>
          </div>
          {isUpdate ? (
            <Textarea
              placeholder="Ghi chú đơn hàng"
              value={formik.values.note}
              onChange={formik.handleChange("note")}
              className="flex-1 h-20"
              disabled={isLoading}
            />
          ) : (
            <div>{user.note}</div>
          )}
        </li>
      </ul>
    </form>
  );
};

export default UserInformation;
