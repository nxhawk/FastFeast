"use server";
import { revalidatePath } from "next/cache";
import { type CategoriesOnProducts, type Order } from "@prisma/client";
import prisma from "@/lib/prismadb";
import { type IProductCart } from "@/lib/store/features/cart/type";
import { type IUserOrder } from "@/components/user/order";

export type FullOrder = Order & {
  items: CategoriesOnProducts[];
};

export async function getAllOrder() {
  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
  });

  return orders;
}

export async function createOrder(userOrder: IUserOrder, totalPrice: number, products: IProductCart[]): Promise<Order> {
  const newOrder = await prisma.order.create({
    data: {
      ...userOrder,
      totalPrice,
      items: {
        create: [
          ...products.map((p) => {
            return {
              product: {
                connect: {
                  id: p.id,
                },
              },
              quantity: p.count,
            };
          }),
        ],
      },
    },
  });

  revalidatePath("/dashboard/orders");
  return newOrder;
}
