"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/common/button";

const ListOrderReview = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <Card className="mt-8">
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg leading-6 text-slate-900">Đơn hàng</h3>
            <p className="text-sm text-muted-foreground">Đơn hàng mới tiếp nhận</p>
          </div>
          <Button func={() => router.push("/dashboard/orders")}>
            Tất cả <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default ListOrderReview;
