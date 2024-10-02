import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowDownZA, ArrowUpAZ, SquarePen } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Category } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCategory } from "@/models/category";
import ConfirmDelete from "@/components/common/confirm-delete";
import { Button } from "@/components/ui/button";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tên
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
      const category = row.original;
      return <div className="px-4">{category.name}</div>;
    },
  },
  {
    accessorKey: "slug",
    header: () => <div>Slug</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("slug")}</div>;
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
          await deleteCategory(id);
          toast.success("Xóa category thành công");
          // reload page
          router.refresh();
        } catch (error) {
          toast.error("Error");
        }
      };

      return (
        <div className="flex items-center gap-1">
          <Link href={`/dashboard/products/categories/${payment.id}`}>
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
