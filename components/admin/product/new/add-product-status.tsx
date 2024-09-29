import React from "react";
import { Status, type Category } from "@prisma/client";
import SelectCategory from "./select-category";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  isLoading: boolean;
  categories: Category[];
  status: Status;
  category: Category[];
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
}

const AddProductStatus = ({ isLoading, categories, status, setStatus, category, setCategory }: Props) => {
  return (
    <div className="w-full md:w-2/6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Label htmlFor="status" className="md:w-40">
                Tình trạng
              </Label>
              <Select
                onValueChange={(e: Status) => setStatus(e)}
                value={status}
                defaultValue="nhap"
                required
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified status to display" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Status.PUBLIC}>Công khai</SelectItem>
                  <SelectItem value={Status.DRAFT}>Nháp</SelectItem>
                  <SelectItem value={Status.OUTSTOCK}>Hết hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SelectCategory
              category={category}
              setCategory={setCategory}
              categories={categories}
              isLoading={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductStatus;
