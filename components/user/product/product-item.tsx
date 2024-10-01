"use client";
import React from "react";
import Image from "next/image";
import { Status } from "@prisma/client";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type FullProduct } from "@/models/product";
import { convertToVND } from "@/utils/helper";
import { type AppDispatch } from "@/lib/store";
import { addToCart } from "@/lib/store/features/cart";

interface Props {
  product: FullProduct;
}

const ProductItem = ({ product }: Props) => {
  const outStock = product.status === Status.OUTSTOCK;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.image?.path || "",
        price: product.price,
        count: 1,
      }),
    );
  };

  return (
    <Card className="w-full overflow-clip rounded-md">
      <CardContent className="p-2 relative">
        {outStock && (
          <div className="z-10 absolute top-0 right-0 rounded-bl-lg text-xs p-0.5 px-2.5 bg-red-600 text-white w-fit">
            Hết hàng
          </div>
        )}

        <div className="flex flex-row lg:flex-col items-center gap-3">
          <div className="max-lg:w-5/12 md:flex-1">
            <Image
              src={product.image?.path || ""}
              width={600}
              height={600}
              className="object-contain min-w-[80px]"
              alt="product image"
            />
          </div>
          <div className="flex flex-col flex-1 p-1 pt-3">
            <div className="md:text-center flex flex-col md:items-center md:justify-center">
              <p className="text-sm lg:text-base leading-tight h-8 lg:h-12 line-clamp-2 font-medium">{product.name}</p>
              <div className="font-bold text-gl lg:text-xl">{convertToVND(product.price)}</div>
            </div>
            <div className="flex flex-row md:flex-col mt-4 gap-2">
              <Button
                disabled={outStock}
                variant="destructive"
                className="uppercase font-semibold"
                onClick={() => {
                  handleAddToCart();
                  toast.success("Đã thêm vào giỏ hàng");
                }}
              >
                thêm vào giỏ
              </Button>
              <Button
                disabled={outStock}
                variant="ghost"
                className="uppercase font-semibold text-red-500 hover:text-red-600"
                onClick={() => {
                  handleAddToCart();
                  router.push("/checkout");
                }}
              >
                mua ngay
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
