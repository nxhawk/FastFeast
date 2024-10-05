import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mt-5 space-y-10">
      <div className="mt-5 space-y-5">
        <Skeleton className="w-[80px] h-5" />
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Danh mục</h1>
          <Skeleton className="w-[80px] h-8 max-md:hidden" />
        </div>
      </div>
      <div className="flex">
        <div className="w-full md:w-9/12 border p-5 rounded-xl shadow">
          <div className="border-b pb-4 font-bold">Thông tin</div>
          <div className="flex items-start gap-2 pt-8">
            <div className="w-2/12">
              <Skeleton className="w-10 h-5" />
            </div>
            <Skeleton className="flex-1 h-8" />
          </div>
          <div className="flex items-start gap-2 pt-8">
            <div className="w-2/12">
              <Skeleton className="w-10 h-5" />
            </div>
            <Skeleton className="flex-1 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
