"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import React from "react";
import {
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
import { type Order } from "@prisma/client";
import { type TPagination } from "../product/product-table";

import ListBoxStatistic1 from "../statistic/list-box-statistic-1";
import { orderColumns } from "./order-columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CustomPagination from "@/components/common/pagination/custom-pagination";
import ExportCSV from "@/components/common/button/export-csv";
import { formateDate } from "@/utils/helper";

interface Props {
  orders: Order[];
  showStatistics?: boolean;
}

const OrderTable = ({ orders, showStatistics = false }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<TPagination>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    data: orders,
    columns: orderColumns,
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

  const convertDataToExportCSV = () => {
    const data = [
      {
        id: "order_id",
        fullName: "fullName",
        phoneNumber: "phoneNumber",
        createdAt: "createdAt",
        totalPrice: "totalPrice",
        paymentStatus: "paymentStatus",
        orderStatus: "orderStatus",
      },
    ];
    orders.forEach((order) => {
      data.push({
        id: order.id,
        fullName: order.fullName,
        phoneNumber: order.phoneNumber,
        createdAt: formateDate(order.createdAt),
        totalPrice: order.totalPrice.toString(),
        paymentStatus: order.paymentMethod,
        orderStatus: order.status,
      });
    });
    return data;
  };

  return (
    <div className="w-full">
      {showStatistics && (
        <div className="my-6">
          <ListBoxStatistic1 table={table} />
        </div>
      )}
      <div className="flex items-center justify-between py-4 gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Lọc mã đơn..."
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)}
            className="max-w-sm py-1"
          />
          <Input
            placeholder="Lọc số điện thoại..."
            value={(table.getColumn("contact")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("contact")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="flex gap-3 items-center">
          <ExportCSV data={convertDataToExportCSV()} fileName="Danh sách đơn hàng" />
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
                <TableCell colSpan={orderColumns.length} className="h-24 text-center">
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

export default OrderTable;
