import React from "react";
import { type Category } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";

interface Props {
  categories: Category[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SelectCategory = ({ categories, category, setCategory }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="category" className="md:w-40">
        Danh mục
      </Label>
      <Select onValueChange={(e) => setCategory(e)} value={category} required>
        <SelectTrigger>
          <SelectValue placeholder="Select a verified category to display" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCategory;
