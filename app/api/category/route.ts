import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { listCategories, newCategory } from "@/models/category";
import { getErrorMessage } from "@/utils/helper";

export async function GET() {
  try {
    const categories = await listCategories();
    return NextResponse.json({ message: "success", data: categories });
  } catch (error) {
    console.log("Error getting all categories", getErrorMessage(error));

    return NextResponse.json(
      { message: `Internal Server Error: ${getErrorMessage(error)}` },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session?.user && session?.user.role !== "ADMIN") {
    //   return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    // }

    const { name, slug } = await request.json();

    if (!name || !slug) {
      return NextResponse.json({ message: "Missing category or slug" }, { status: 400 });
    }

    const nCategory = await newCategory(name as string, (slug as string).toLowerCase());
    revalidateTag("categories");
    return NextResponse.json({ message: "success", data: nCategory });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ message: `Invalid JSON: ${getErrorMessage(error)}` }, { status: 400 });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: "Category already exists" }, { status: 400 });
      }
    }

    return NextResponse.json(
      { message: `Internal Server Error: ${getErrorMessage(error)}` },
      {
        status: 500,
      },
    );
  }
}
