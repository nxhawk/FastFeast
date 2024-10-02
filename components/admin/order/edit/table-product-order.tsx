import React from "react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type FullProductOnOrder } from "@/models/order";
import { convertToVND } from "@/utils/helper";

interface Props {
  products: FullProductOnOrder[];
  totalPrice: number;
}

const TableProductOrder = ({ products, totalPrice }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Món</TableHead>
          <TableHead>Số lượng</TableHead>
          <TableHead>Đơn giá</TableHead>
          <TableHead className="text-right">Tổng</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium py-0.5">
              <Image
                src={product.product.image?.path || ""}
                alt="product image"
                width={80}
                height={80}
                className="object-contain min-w-20 min-h-20 max-w-20 max-h-20"
              />
            </TableCell>
            <TableCell className="py-0.5">{product.product.name}</TableCell>
            <TableCell className="py-0.5">{product.quantity}</TableCell>
            <TableCell className="py-0.5">{convertToVND(product.product.price)}</TableCell>
            <TableCell className="text-right py-0.5">
              {convertToVND(product.product.price * product.quantity)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="font-semibold">
          <TableCell colSpan={4}>Tổng</TableCell>
          <TableCell className="text-right">{convertToVND(totalPrice)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableProductOrder;
