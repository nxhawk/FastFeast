import React from "react";
import { type Category } from "@prisma/client";
import SelectCategory from "./select-category";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  categories: Category[];
  status: string;
  category: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const AddProductStatus = ({ categories, status, setStatus, category, setCategory }: Props) => {
  return (
    <div className="w-full md:w-2/6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Label htmlFor="status" className="md:w-40">
                Tình trạng
              </Label>
              <Select onValueChange={(e) => setStatus(e)} value={status} defaultValue="nhap" required>
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
            <SelectCategory category={category} setCategory={setCategory} categories={categories} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductStatus;
