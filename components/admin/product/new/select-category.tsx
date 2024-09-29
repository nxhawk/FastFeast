"use client";
import React from "react";
import { type Category } from "@prisma/client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  isLoading: boolean;
  categories: Category[];
  category: Category[];
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
}

const SelectCategory = ({ isLoading, categories, category, setCategory }: Props) => {
  const updateSelectCategory = (cate: Category) => {
    const filterCategory = category.filter((c) => c.id !== cate.id);
    const haveCategory = category.filter((c) => c.id === cate.id).length > 0;
    if (haveCategory) {
      setCategory([...filterCategory]);
    } else {
      setCategory([...filterCategory, cate]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="category" className="md:w-40">
        Danh mục
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="flex w-full justify-start flex-wrap h-fit gap-2"
            disabled={isLoading}
          >
            <div className="flex-1 flex w-full justify-start flex-wrap h-fit gap-2">
              {category.map((cate) => (
                <div key={cate.id} className="bg-slate-200 font-medium px-2 rounded flex items-center gap-1">
                  {cate.name}
                  <X
                    size={13}
                    className="text-slate-500 hover:text-slate-800"
                    onClick={() => updateSelectCategory(cate)}
                  />
                </div>
              ))}
            </div>
            <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {categories.map((cate) => (
                  <CommandItem key={cate.id} value={cate.name} onSelect={() => updateSelectCategory(cate)}>
                    <CheckIcon
                      className={cn(
                        "h-4 w-4 mr-2",
                        category.find((c) => c.id === cate.id) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {cate.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectCategory;
