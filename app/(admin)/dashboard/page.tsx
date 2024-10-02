import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Admin site | FastFeast - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "/images/logo.png",
};

const Page = () => {
  return <div className="h-screen">Page</div>;
};

export default Page;
