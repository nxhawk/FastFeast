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
            <DropdownMenuItem>
              <Link href={"/dashboard"} className="flex gap-2 items-center w-full">
                <Gauge size="17" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard"} className="flex gap-2 items-center w-full">
                <LayoutList size="17" />
                Đơn hàng
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard"} className="flex gap-2 items-center w-full">
                <LayoutList size="17" />
                Báo cáo
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div className="flex gap-2 items-center w-full">
                  <Package size="17" />
                  Sản phẩm
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link href={"/dashboard/products"}>Danh sách</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/dashboard/products/categories"}>Categories</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/dashboard/products/tags"}>Tags</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Link href={"/dashboard"} className="flex gap-2 items-center w-full">
                <UsersRound size="17" />
                Người dùng
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminMenuDropdown;
