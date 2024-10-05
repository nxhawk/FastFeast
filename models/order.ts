"use server";
import { revalidatePath } from "next/cache";
import {
  PaymentMethod,
  type ProductOnOrder,
  type Order,
  type Product,
  type Image,
  type OrderState,
} from "@prisma/client";
import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from "date-fns";
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

async function calculateSumCountOrder(from: Date, to: Date) {
  const day = await prisma.order.aggregate({
    where: {
      createdAt: {
        gte: startOfDay(from),
        lte: endOfDay(to),
      },
      paymentMethod: PaymentMethod.BANK,
    },
    _sum: {
      totalPrice: true,
    },
    _count: {
      id: true,
    },
  });
  return day;
}

export async function getStatisticsDashboard() {
  // calculate today
  const today = await calculateSumCountOrder(new Date(), new Date());
  // calculate this week
  const week = await calculateSumCountOrder(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    endOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  // calculate this month
  const month = await calculateSumCountOrder(startOfMonth(new Date()), endOfMonth(new Date()));

  return [
    {
      title: "Hôm nay",
      total: today._sum.totalPrice,
      quantity: today._count.id,
    },
    {
      title: "Tuần này",
      total: week._sum.totalPrice,
      quantity: week._count.id,
    },
    {
      title: "Tháng này",
      total: month._sum.totalPrice,
      quantity: month._count.id,
    },
  ];
}

export async function updateOrderStatus(id: string, orderStatus: OrderState, paymentStatus: PaymentMethod) {
  const updateOrder = await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: orderStatus,
      paymentMethod: paymentStatus,
    },
  });

  return updateOrder;
}

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

export async function getAllOrderById(id: string) {
  let orders: FullOrder[] = [];
  try {
    orders = await prisma.order.findMany({
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
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  } catch (error) {
    try {
      orders = await prisma.order.findMany({
        where: {
          phoneNumber: id,
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
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    } catch (error) {
      orders = [];
    }
  }

  return orders;
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

export async function getAllOrder(fromDay?: string, toDay?: string) {
  if (fromDay && toDay) {
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfDay(new Date(fromDay)),
          lte: endOfDay(new Date(toDay)),
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        items: true,
      },
    });

    return orders;
  }
  const orders = await prisma.order.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
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
