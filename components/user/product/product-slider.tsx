"use client";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductItem from "./product-item";
import { type FullProduct } from "@/models/product";
import { Button } from "@/components/ui/button";

interface Props {
  products?: FullProduct[];
  title: string;
  categoryId?: string;
}

const ProductSlider = ({ products, title, categoryId }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const changeRouter = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId !== "all") {
      params.set("categoryId", categoryId);
    } else {
      params.delete("categoryId");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative products-list">
      <div className="font-bold uppercase text-2xl">{title}</div>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mt-5"
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
        {products?.map((product, idx) => {
          if (idx < 14)
            return (
              <SwiperSlide key={product.id}>
                <ProductItem product={product} />
              </SwiperSlide>
            );
          return <div key={product.id}></div>;
        })}
      </Swiper>
      {categoryId && (
        <div className="flex items-center justify-center my-5">
          <Button variant="outline" onClick={() => changeRouter(categoryId || "all")}>
            Xem tất cả
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
