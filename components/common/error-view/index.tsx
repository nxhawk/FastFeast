"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../button";

const ErrorView = () => {
  const router = useRouter();
  return (
    <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-indigo-600 dark:text-indigo-500">
          Error
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          Có lỗi xảy ra
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          An error occurred in the Server Components render. The specific message is omitted in production builds to
          avoid leaking sensitive details. A digest property is included on this error instance which may provide
          additional details about the nature of the error.
        </p>
        <div className="w-full flex justify-center">
          <Button func={() => router.push("/dashboard")}>
            <ArrowLeft size={17} />
            Quay lại Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorView;
