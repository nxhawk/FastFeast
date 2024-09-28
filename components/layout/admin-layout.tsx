"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavItem from "./nav-item";
import AdminMenuDropdown from "./admin-menu-dropdown";
import UserAvatar from "./user-avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Logo from "@/components/common/logo";
import { cn } from "@/lib/utils";

const components: { title: string; href: string }[] = [
  {
    title: "Danh sách",
    href: "/dashboard/products",
  },
  {
    title: "Categories",
    href: "/docs/primitives/alert-dialog",
  },
  {
    title: "Tags",
    href: "/docs/primitives/alert-dialog",
  },
];

const AdminLayout = () => {
  const pathName = usePathname();

  return (
    <div className="max-w-screen-lg mx-auto flex justify-between items-center h-16 px-2">
      <div className="flex items-center gap-5 h-full">
        <AdminMenuDropdown />
        <Logo showText={true} />
        <div className="flex items-center gap-2 h-full font-medium max-md:hidden">
          <NavItem title="Dashboard" href="/dashboard" pathName={pathName} />
          <NavItem title="Đơn hàng" href="/dashboard/orders" pathName={pathName} />
          <NavItem title="Báo cáo" href="/dashboard/reports" pathName={pathName} />
          <NavigationMenu
            className={cn(
              "h-full",
              pathName.startsWith("/dashboard/products") && "border-b text-indigo-700 border-indigo-700",
            )}
          >
            <NavigationMenuList className="h-full">
              <NavigationMenuItem className="h-full">
                <NavigationMenuTrigger className="h-full">Sản phẩm</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-[0.4rem]">
                    {components.map((component) => (
                      <ListItem key={component.title} title={component.title} href={component.href}></ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavItem title="Người dùng" href="/dashboard/users" pathName={pathName} />
        </div>
      </div>
      <div>
        <UserAvatar url={"https://github.com/shadcn.png"} />
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href || ""}
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md pl-2 pr-6 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default AdminLayout;
