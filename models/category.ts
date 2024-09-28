import prisma from "@/lib/prismadb";

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
