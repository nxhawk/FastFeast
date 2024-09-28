"use client";
import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { type TPagination } from "@/components/admin/category/category-table";

interface Props {
  pagination: TPagination;
  setPagination: React.Dispatch<React.SetStateAction<TPagination>>;
}

const CustomPagination = ({ pagination, setPagination }: Props) => {
  return (
    <div className="flex items-center gap-3 md:gap-8 max-md:flex-col-reverse">
      <div className="flex items-center gap-3">
        <Label htmlFor="status" className="whitespace-nowrap text-sm font-medium">
          Rows per page
        </Label>
        <Select
          onValueChange={(e) => setPagination({ ...pagination, pageSize: parseInt(e) })}
          defaultValue={"10"}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a verified per page to display" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((item) => (
              <SelectItem key={item} value={(item * 10).toString()}>
                {item * 10}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center text-sm font-medium">Page {pagination.pageIndex + 1} of 1</div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="max-md:hidden">
          <ChevronsLeft className="h-5 w-5 text-slate-400" />
        </Button>
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-5 w-5 text-slate-400" />
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-5 w-5 text-slate-400" />
        </Button>
        <Button variant="outline" size="icon" className="max-md:hidden">
          <ChevronsRight className="h-5 w-5 text-slate-400" />
        </Button>
      </div>
    </div>
  );
};

export default CustomPagination;
