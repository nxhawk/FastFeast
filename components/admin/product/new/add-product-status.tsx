import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddProductStatus = () => {
  return (
    <div className="w-full md:w-2/6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Label htmlFor="status" className="md:w-40">
                Tình trạng
              </Label>
              <Select onValueChange={() => {}} defaultValue="nhap" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified status to display" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="congkhai">Công khai</SelectItem>
                  <SelectItem value="nhap">Nháp</SelectItem>
                  <SelectItem value="hethang">Hết hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="category" className="md:w-40">
                Danh mục
              </Label>
              <Select onValueChange={() => {}} required>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="congkhai">Công khai</SelectItem>
                  <SelectItem value="nhap">Nháp</SelectItem>
                  <SelectItem value="hethang">Hết hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductStatus;
