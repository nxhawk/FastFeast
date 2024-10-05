import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="pt-6 pb-4 space-y-10">
      <div className="space-y-3">
        <Skeleton className="w-[80px] h-4" />
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Sản Phẩm</h1>
          <Skeleton className="w-[80px] h-8 max-md:hidden" />
        </div>
      </div>
      <div className="flex max-md:flex-col gap-5 w-full">
        <div className="border p-5 rounded-xl w-full md:w-4/6 flex flex-col max-md:gap-4">
          <div className="border-b pb-4 font-bold">Thông tin</div>
          <div className="mt-8 space-y-8">
            <div className="flex items-start">
              <div className="w-2/12">
                <Skeleton className="w-10 h-5" />
              </div>
              <div className="flex-1 space-y-3">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="flex-1 h-10" />
              </div>
            </div>
            {[...Array(3)].map((_, x) => (
              <div key={x} className="flex items-start">
                <div className="w-2/12">
                  <Skeleton className="w-10 h-5" />
                </div>
                <div className="flex-1 space-y-3">
                  <Skeleton className="flex-1 h-10" />
                </div>
              </div>
            ))}
            <div className="flex items-start">
              <div className="w-2/12">
                <Skeleton className="w-10 h-5" />
              </div>
              <div className="flex-1 space-y-3">
                <Skeleton className="flex-1 h-20" />
              </div>
            </div>
          </div>
        </div>
        <div className="border p-5 rounded-xl w-full h-fit md:w-2/6 space-y-8">
          <div className="space-y-3">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-8" />
          </div>
          <div className="space-y-3">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-full h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
