"use client";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ProductItem from "./product-item";
import { type FullProduct } from "@/models/product";
import { Button } from "@/components/ui/button";

interface Props {
  products?: FullProduct[];
  title: string;
  func?: () => void;
}

const ProductSlider = ({ products, title, func }: Props) => {
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
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      {typeof func === "function" && (
        <div className="flex items-center justify-center">
          <Button variant="outline" onClick={func}>
            Xem tất cả
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
