import React from "react";
import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserAvatar = ({ url }: { url: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={url} alt="user image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuLabel className="font-medium">
          <div>Hào Nguyễn Nhật</div>
          <div>haonhat2729@gmail.com</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/dashboard"} className="flex gap-2 items-center w-full">
              <Settings size="17" />
              Cài đặt tài khoản
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/dashboard"} className="flex gap-2 items-center w-full">
              <LogOut size={17} />
              Đăng xuất
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
