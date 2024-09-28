import prisma from "@/lib/prismadb";

export async function updateCategory(id: string, name: string, slug: string) {
  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
    },
  });
  return updatedCategory;
}

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return category;
}

export async function listCategories() {
  const categories = await prisma.category.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
  return categories;
}

export async function newCategory(name: string, slug: string) {
  // add new category
  const newCategory = await prisma.category.create({
    data: {
      name,
      slug,
    },
  });

  return newCategory;
}

export async function deleteCategory(id: string) {
  const deteledCategory = await prisma.category.delete({
    where: {
      id,
    },
  });

  return deteledCategory;
}
