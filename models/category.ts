import prisma from "@/lib/prismadb";

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
