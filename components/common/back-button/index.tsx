"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="cursor-pointer inline-flex items-center gap-1 font-medium text-xs" onClick={() => router.back()}>
      <ChevronLeft size={17} />
      Quay lại
    </div>
  );
};

export default BackButton;
