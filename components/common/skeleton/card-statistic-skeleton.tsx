import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CardStatisticSkeleton = () => {
  return (
    <div className="flex gap-3 md:gap-5 flex-wrap max-md:flex-col mt-6">
      {[1, 2, 3].map((item) => (
        <div className="w-full md:w-[250px]" key={item}>
          <Skeleton className="h-[110px] w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default CardStatisticSkeleton;
