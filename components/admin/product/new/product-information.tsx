import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { convertToVND, toSlug } from "@/utils/helper";

interface Props {
  isLoading: boolean;
  title: string;
  slug: string;
  description: string;
  image: string;
  price: number;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const ProductInformation = ({
  isLoading,
  title,
  setTitle,
  slug,
  setSlug,
  description,
  setDescription,
  image,
  setImage,
  price,
  setPrice,
}: Props) => {
  function handleChangeImage(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    if (!changeEvent.target.files) return;

    const file = Array.from(changeEvent.target.files)[0];
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImage(onLoadEvent.target?.result as string);
    };

    reader.readAsDataURL(file);
  }

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
                <Avatar className="w-24 h-24 rounded-none">
                  <AvatarImage src={image} alt="product image" className="rounded-none" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                <div>
                  <Input id="image" type="file" onChange={handleChangeImage} multiple={false} disabled={isLoading} />
                  <p className="mt-2 text-[0.8rem] text-muted-foreground">Vui lòng chọn ảnh</p>
                </div>
              </div>
            </div>

            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="title" className="md:w-40">
                Tiêu đề
              </Label>
              <Input
                id="title"
                required
                disabled={isLoading}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="slug" className="md:w-40">
                Slug
              </Label>
              <div className="flex justify-center gap-2 w-full">
                <Input
                  id="slug"
                  className="flex-1"
                  required
                  disabled={isLoading}
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <Button variant="secondary" type="button" onClick={() => setSlug(toSlug(title))} disabled={isLoading}>
                  Generate
                </Button>
              </div>
            </div>

            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="price" className="md:w-40">
                Giá bán
              </Label>
              <div className="flex-1 flex gap-2 items-center">
                <Input
                  id="price"
                  className="flex-2"
                  type="number"
                  max={2000000}
                  min={10000}
                  required
                  disabled={isLoading}
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <div className="px-2 mt-1 text-sm flex-1">{!isNaN(price) ? convertToVND(price) : ""}</div>
              </div>
            </div>

            <div className="flex max-md:flex-col justify-between gap-2">
              <Label htmlFor="description" className="md:w-40">
                Mô tả
              </Label>
              <Textarea
                id="description"
                className="min-h-[80px]"
                disabled={isLoading}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductInformation;
