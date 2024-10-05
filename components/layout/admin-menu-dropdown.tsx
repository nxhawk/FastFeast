import React from "react";
import { Gauge, LayoutList, Menu, Package, UsersRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminMenuDropdown = () => {
  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ml-2 md:hidden">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={"/dashboard"}>
              <DropdownMenuItem className="flex gap-2 items-center w-full cursor-pointer">
                <Gauge size="17" />
                Dashboard
              </DropdownMenuItem>
            </Link>
            <Link href={"/dashboard/orders"}>
              <DropdownMenuItem className="cursor-pointer flex gap-2 items-center w-full">
                <LayoutList size="17" />
                Đơn hàng
              </DropdownMenuItem>
            </Link>
            <Link href={"/dashboard/reports"}>
              <DropdownMenuItem className="flex gap-2 items-center w-full cursor-pointer">
                <LayoutList size="17" />
                Báo cáo
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className="flex gap-2 items-center w-full">
                  <Package size="17" />
                  Sản phẩm
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <Link href={"/dashboard/products"}>
                    <DropdownMenuItem className="cursor-pointer">Danh sách</DropdownMenuItem>
                  </Link>
                  <Link href={"/dashboard/products/categories"}>
                    <DropdownMenuItem className="cursor-pointer">Categories</DropdownMenuItem>
                  </Link>
                  <Link href={"/dashboard/products/tags"}>
                    <DropdownMenuItem className="cursor-pointer">Tags</DropdownMenuItem>
                  </Link>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <Link href={"/dashboard"}>
              <DropdownMenuItem className="flex gap-2 items-center w-full cursor-pointer">
                <UsersRound size="17" />
                Người dùng
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminMenuDropdown;
