import Link from "next/link";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowDownZA, ArrowUpAZ, SquarePen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formateDate, statusToTitle } from "@/utils/helper";
import { deleteProduct, type FullProduct } from "@/models/product";
import ConfirmDelete from "@/components/common/confirm-delete";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const productColumns: ColumnDef<FullProduct>[] = [
  {
    accessorKey: "Ảnh",
    header: () => <div>Ảnh</div>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Image
          width={100}
          height={200}
          src={product.image?.path || ""}
          alt="product image"
          className="object-cover min-w-20 min-h-20 max-w-20 max-h-20"
        />
      );
    },
  },
  {
    accessorKey: "name",
    sortingFn: (rowA, rowB) => rowA.original.name.localeCompare(rowB.original.name),
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tiêu đề
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
      return <div className="px-4">{product.name}</div>;
    },
  },
  {
    accessorKey: "Cập nhật",
    sortingFn: (rowA, rowB) => {
      return rowA.original.updatedAt.toISOString().localeCompare(rowB.original.updatedAt.toISOString());
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            console.log(column.getIsSorted());
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Cập nhật
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
      return <div className="px-4">{formateDate(product.updatedAt)}</div>;
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
          <Badge variant={statusToTitle(product.status)?.variant}>{statusToTitle(product.status)?.title}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "Danh mục",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Danh mục
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-2">
          {product.categories.map((category) => (
            <Badge key={category.category.id} variant="secondary" className="text-nowrap">
              {category.category.name}
            </Badge>
          ))}
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
          await deleteProduct(id);
          toast.success("Xóa sản phẩm thành công");
          // reload page
          router.refresh();
        } catch (error) {
          toast.error("Error");
        }
      };

      return (
        <div className="flex items-center gap-1">
          <Link href={`/dashboard/products/${payment.id}`}>
            <Button variant="ghost" size="icon">
              <SquarePen size={17} />
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
