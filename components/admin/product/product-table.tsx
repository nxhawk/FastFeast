/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { SlidersHorizontal, SquarePen } from "lucide-react";
import React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { type Category } from "@prisma/client";
import FilterCategory from "./filter-category";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CustomPagination from "@/components/common/pagination/custom-pagination";
import ConfirmDelete from "@/components/common/confirm-delete";
import { deleteProduct, type FullProduct } from "@/models/product";
import { formateDate, statusToTitle } from "@/utils/helper";
import { Badge } from "@/components/ui/badge";

interface Props {
  products: FullProduct[];
  categories: Category[];
}

export const columns: ColumnDef<FullProduct>[] = [
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
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tiêu đề
          <CaretSortIcon className="ml-2 h-4 w-4" />
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
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Cập nhật
          <CaretSortIcon className="ml-2 h-4 w-4" />
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
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tình trạng
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return <Badge variant={statusToTitle(product.status)?.variant}>{statusToTitle(product.status)?.title}</Badge>;
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
          <Button variant="ghost" size="icon" onClick={() => router.push(`/dashboard/products/${payment.id}`)}>
            <SquarePen size={17} />
          </Button>
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

export type TPagination = {
  pageIndex: number;
  pageSize: number;
};

const ProductTable = ({ products, categories }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<TPagination>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <div className="flex items-center gap-5">
          <Input
            placeholder="Lọc tiêu đề..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <FilterCategory categories={categories} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto max-md:hidden">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Cột</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 max-md:flex-col-reverse gap-5">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <CustomPagination
            pagination={pagination}
            setPagination={setPagination}
            totalItem={table.getFilteredRowModel().rows.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
