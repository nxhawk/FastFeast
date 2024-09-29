/* eslint-disable @typescript-eslint/no-unsafe-return */
"use server";
import { revalidatePath } from "next/cache";
import { type Product, type Category, type Status, type Image } from "@prisma/client";
import { createImage, deleteImage } from "./image";
import { deleteCategoryConnectProduct } from "./pandc";
import prisma from "@/lib/prismadb";

export type FullProduct = Product & {
  image: Image | null;
  categories: {
    category: Category;
  }[];
};

export async function updateProduct(
  id: string,
  name: string,
  slug: string,
  description: string,
  status: Status,
  price: number,
  image: string,
  imageId: string,
  categories: Category[],
) {
  let thumb = await prisma.image.findUnique({
    where: {
      id: imageId,
    },
  });
  if (!image.startsWith(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`)) {
    // delete current product image
    try {
      await deleteImage(imageId);
    } catch (error) {}
    // add product image
    thumb = await createImage(image);
  }

  const product = await getProductById(id);
  if (!product) return;

  for (const category of product.categories) {
    await deleteCategoryConnectProduct(product.id as string, category.categoryId as string);
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      description,
      status,
      price,
      image: {
        connect: {
          id: thumb?.id,
        },
      },
      categories: {
        create: [
          ...categories.map((cate) => {
            return {
              category: {
                connect: {
                  id: cate.id,
                },
              },
            };
          }),
        ],
      },
    },
  });

  revalidatePath("/dashboard/products");
  revalidatePath(`/dashboard/products/${id}`);

  return updatedProduct;
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      image: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
  return product;
}

export async function listProducts() {
  const products = await prisma.product.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
    include: {
      image: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  return products;
}

export async function newProduct(
  name: string,
  slug: string,
  description: string,
  status: Status,
  price: number,
  image: string,
  categories: Category[],
): Promise<Product> {
  // add product image
  const thumb = await createImage(image);

  // add new product
  const newProduct = await prisma.product.create({
    data: {
      name,
      slug,
      description: description || "",
      status,
      price,
      image: {
        connect: {
          id: thumb.id,
        },
      },
      categories: {
        create: [
          ...categories.map((cate) => {
            return {
              category: {
                connect: {
                  id: cate.id,
                },
              },
            };
          }),
        ],
      },
    },
  });
  revalidatePath("/dashboard/products");

  return newProduct;
}

export async function deleteProduct(id: string) {
  const product = await getProductById(id);
  if (!product) return;

  // delete product image
  try {
    await deleteImage(product.image?.id || "");
  } catch (error) {}

  // delete category connect product
  await prisma.categoriesOnProducts.deleteMany({
    where: {
      productId: product.id,
    },
  });

  // delete product
  const deteledProduct = await prisma.product.delete({
    where: {
      id,
    },
  });
  revalidatePath("/dashboard/products");

  return deteledProduct;
}
