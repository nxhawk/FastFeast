"use server";
import { revalidatePath } from "next/cache";
import { type Product, type Category, type Status } from "@prisma/client";
import { createImage } from "./image";
import prisma from "@/lib/prismadb";

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
