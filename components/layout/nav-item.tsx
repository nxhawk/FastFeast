import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  title: string;
  pathName: string;
}

const NavItem = ({ href, title, pathName }: Props) => {
  function checkToggle() {
    if (href === "/dashboard")
      return (
        (pathName === "/dashboard" || pathName === "/dashboard/") && (href === "/dashboard" || href === "/dashboard/")
      );
    return pathName.startsWith(href);
  }
  return (
    <Link
      href={href}
      className={cn(
        "text-sm h-full flex items-center  px-2",
        checkToggle() && "border-b text-indigo-700 border-indigo-700",
      )}
    >
      {title}
    </Link>
  );
};

export default NavItem;
