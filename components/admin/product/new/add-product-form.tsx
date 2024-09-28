"use client";
import React from "react";
import { type Category } from "@prisma/client";
import ProductInformation from "./product-information";
import AddProductStatus from "./add-product-status";
import BackButton from "@/components/common/back-button";
import { Button } from "@/components/ui/button";

interface Props {
  categories: Category[];
}

const AddProductForm = ({ categories }: Props) => {
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("nhap");
  const [category, setCategory] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState("");

  const addNewProduct = () => {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="pt-6 pb-4">
        <BackButton />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-gray-900 leading-8 mb-0">Sản Phẩm</h1>
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap flex items-center gap-1 font-medium max-md:hidden"
            type="submit"
          >
            Tạo Sản Phẩm
          </Button>
        </div>
        <div className="flex max-md:flex-col flex-no-wrap gap-5 w-full pt-8 ">
          <div className="w-full md:w-4/6 flex flex-col max-md:gap-4">
            <ProductInformation
              isLoading={isLoading}
              title={title}
              setTitle={setTitle}
              slug={slug}
              image={image}
              setSlug={setSlug}
              description={description}
              setDescription={setDescription}
              setImage={setImage}
            />
            <Button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-indigo-500 hover:to-blue-600 shadow whitespace-nowrap flex items-center gap-1 font-medium w-fit self-end mt-10 md:hidden"
              type="submit"
            >
              Tạo Sản Phẩm
            </Button>
          </div>
          <AddProductStatus
            status={status}
            setStatus={setStatus}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
