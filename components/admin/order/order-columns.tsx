import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowDownZA, ArrowUpAZ, Eye } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Order } from "@prisma/client";
import PaymentStatus from "./payment-status";
import StatusOrder from "./status-order";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { convertToVND, formateDate } from "@/utils/helper";
import ConfirmDelete from "@/components/common/confirm-delete";
import { Button } from "@/components/ui/button";

export const orderColumns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Mã đơn
        {column.getIsSorted() === "asc" ? (
          <ArrowUpAZ className="ml-1 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDownZA className="ml-1 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-1 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Link href={`/orders/${order.id}`}>
          <Badge variant="secondary">{order.id.slice(0, 6)}...</Badge>
        </Link>
      );
    },
  },
  {
    accessorKey: "contact",
    accessorFn: (row) => row.phoneNumber,
    header: () => <div>Liên hệ</div>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col">
          <p className="text-nowrap">{order.fullName}</p>
          <p className="text-xs text-gray-600 text-nowrap">{order.phoneNumber}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "Ngày tạo",
    sortingFn: (rowA, rowB) => {
      return rowA.original.createdAt.toISOString().localeCompare(rowB.original.createdAt.toISOString());
    },
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ngày tạo
          {column.getIsSorted() === "asc" ? (
            <ArrowUpAZ className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDownZA className="ml-1 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-1 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-xs text-gray-600">Ngày:</p>
            <div className="text-sm">{formateDate(order.createdAt).split(" ")[1]}</div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-600">Giờ:</p>
            <div className="text-sm">{formateDate(order.createdAt).split(" ")[0]}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "Tổng tiền",
    sortingFn: (rowA, rowB) => rowA.original.totalPrice - rowB.original.totalPrice,
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tổng tiền
          {column.getIsSorted() === "asc" ? (
            <ArrowUpAZ className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDownZA className="ml-1 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-1 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      return <div className="px-4">{convertToVND(order.totalPrice)}</div>;
    },
  },
  {
    accessorKey: "Thanh toán",
    header: () => <div>Thanh toán</div>,
    cell: ({ row }) => {
      const order = row.original;
      return <PaymentStatus status={order.paymentMethod} />;
    },
  },
  {
    accessorKey: "Tình trạng",
    sortingFn: (rowA, rowB) => rowA.original.status.localeCompare(rowB.original.status),
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tình trạng
          {column.getIsSorted() === "asc" ? (
            <ArrowUpAZ className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDownZA className="ml-1 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-1 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="px-4">
          <StatusOrder status={product.status} />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      const handleDelete = async () => {
        const id = payment.id;
        try {
          toast.success("Xóa sản phẩm thành công");
          // reload page
          router.refresh();
        } catch (error) {
          toast.error("Error");
        }
      };

      return (
        <div className="flex items-center gap-1">
          <Link href={`/dashboard/orders/${payment.id}`}>
            <Button variant="ghost" size="icon">
              <Eye size={17} />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id + "")}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ConfirmDelete handleDelete={handleDelete} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
