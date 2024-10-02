"use client";
import React from "react";
import { Status, type Category } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductInformation from "./product-information";
import AddProductStatus from "./add-product-status";
import BackButton from "@/components/common/back-button";
import { Button } from "@/components/ui/button";
import { type FullProduct, newProduct, updateProduct } from "@/models/product";

interface Props {
  categories: Category[];
  product: FullProduct | null;
}

const AddProductForm = ({ categories, product }: Props) => {
  const router = useRouter();
  const [title, setTitle] = React.useState(product?.name ?? "");
  const [slug, setSlug] = React.useState(product?.slug ?? "");
  const [description, setDescription] = React.useState(product?.description ?? "");
  const [status, setStatus] = React.useState<Status>(product?.status ?? Status.DRAFT);
  const [category, setCategory] = React.useState<Category[]>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    product?.categories && product?.categories?.length > 0 ? [...product.categories.map((cate) => cate.category)] : [],
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState(product?.image?.path ?? "");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [price, setPrice] = React.useState<number>(product?.price ? product.price : 0);

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

  const updateOneProduct = async () => {
    try {
      setIsLoading(true);
      await updateProduct(
        product?.id || "",
        title,
        slug,
        description,
        status,
        price,
        image,
        product?.image?.id || "",
        category,
      );
      toast.success("Cập nhật sản phẩm thành công");
      // redirect to list product page
      router.push("/dashboard/products");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      updateOneProduct();
    } else {
      addNewProduct();
    }
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
            {product ? "Cập nhật" : "Tạo Sản Phẩm"}
          </Button>
        </div>
        <div className="flex max-md:flex-col gap-5 w-full pt-8 ">
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
              {product ? "Cập nhật" : "Tạo Sản Phẩm"}
            </Button>
          </div>
          <AddProductStatus
            status={status}
            setStatus={setStatus}
            category={category}
            setCategory={setCategory}
            categories={categories}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
