"use server";
import prisma from "@/lib/prismadb";

export async function deleteCategoryConnectProduct(productId: string, categoryId: string) {
  const deleteField = await prisma.categoriesOnProducts.findFirst({
    where: {
      productId,
      categoryId,
    },
  });

  if (!deleteField) return;

  await prisma.categoriesOnProducts.delete({
    where: {
      id: deleteField.id,
    },
  });
}
