import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ProductInformation = () => {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="border-b pb-5">Thông tin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-3 flex flex-col gap-8">
            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="image" className="md:w-40">
                Image
              </Label>
              <div className="flex flex-col gap-3 w-full">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="null" alt="@shadcn" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                <div>
                  <Input id="image" type="file" />
                  <p className="mt-2 text-[0.8rem] text-muted-foreground">Vui lòng chọn ảnh</p>
                </div>
              </div>
            </div>

            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="title" className="md:w-40">
                Tiêu đề
              </Label>
              <Input id="title" required />
            </div>

            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="slug" className="md:w-40">
                Slug
              </Label>
              <div className="flex justify-center gap-2 w-full">
                <Input id="slug" className="flex-1" required />
                <Button variant="secondary" type="button">
                  Generate
                </Button>
              </div>
            </div>

            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="description" className="md:w-40">
                Mô tả
              </Label>
              <Textarea id="description" className="min-h-[80px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductInformation;
