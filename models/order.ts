"use server";
import { revalidatePath } from "next/cache";
import { type ProductOnOrder, type Order, type Product, type Image } from "@prisma/client";
import prisma from "@/lib/prismadb";
import { type IProductCart } from "@/lib/store/features/cart/type";
import { type IUserOrder } from "@/components/user/order";

export type FullOrder = Order & {
  items: FullProductOnOrder[];
};

export type FullProductOnOrder = ProductOnOrder & {
  product: Product & {
    image: Image | null;
  };
};

export async function updateInfoUserOrder(id: string, user: IUserOrder) {
  const updateOrder = await prisma.order.update({
    where: {
      id,
    },
    data: {
      ...user,
    },
  });

  return updateOrder;
}

export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              image: true,
            },
          },
        },
      },
    },
  });

  return order;
}

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

export async function deleteOrder(id: string) {
  // delete product connect order
  await prisma.productOnOrder.deleteMany({
    where: {
      orderId: id,
    },
  });

  const deteleOrder = await prisma.order.delete({
    where: {
      id,
    },
  });
  revalidatePath("/dashboard/products/orders");

  return deteleOrder;
}
