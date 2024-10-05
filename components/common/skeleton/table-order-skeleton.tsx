import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  columns: number;
  rows: number;
  haveBorder?: boolean;
}

const TableOrderSkeleton = ({ columns, rows, haveBorder = true }: Props) => {
  return (
    <div className={cn("flex flex-col gap-3 overflow-hidden", haveBorder && "border rounded-xl shadow ")}>
      <div className="">
        {[...Array(rows)].map((_, index) => (
          <div
            className={cn("hover:bg-muted/50 flex justify-between gap-3 md:gap-8 p-3", index < rows - 1 && "border-b")}
            key={index}
          >
            {[...Array(columns)].map((_, index) => (
              <div key={index} className="w-[200px]">
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOrderSkeleton;
