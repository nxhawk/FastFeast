"use client";
import React from "react";
import { Status, type Category } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductInformation from "./product-information";
import AddProductStatus from "./add-product-status";
import BackButton from "@/components/common/back-button";
import { Button } from "@/components/ui/button";
import { newProduct } from "@/models/product";

interface Props {
  categories: Category[];
}

const AddProductForm = ({ categories }: Props) => {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState<Status>(Status.DRAFT);
  const [category, setCategory] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [price, setPrice] = React.useState<number>(0);

  const addNewProduct = async () => {
    if (!image || image.length <= 0) {
      return toast.error("Vui lòng chọn ảnh sản phẩm");
    }
    if (!category || category.length <= 0) {
      return toast.error("Vui lòng chọn thể loại");
    }
    // add new product
    try {
      setIsLoading(true);
      await newProduct(title, slug, description, status, price, image, category);
      toast.success("Thêm sản phẩm thành công");
      //redirect to list category page
      router.push("/dashboard/products");
    } catch (error) {
      toast.error("Sản phẩm này đã tồn tại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addNewProduct();
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
              price={price}
              setSlug={setSlug}
              description={description}
              setDescription={setDescription}
              setImage={setImage}
              setPrice={setPrice}
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
