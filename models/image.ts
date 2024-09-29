import { type Image } from "@prisma/client";
import prisma from "@/lib/prismadb";
import cloudinary from "@/lib/cloudinary";

export async function createImage(data: string): Promise<Image> {
  try {
    const res = await cloudinary.v2.uploader.upload(data, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });
    const image = await prisma.image.create({
      data: {
        name: res.public_id,
        path: res.secure_url,
      },
    });

    return image;
  } catch (error) {
    console.log(error);
    throw new Error("Image ERROR");
  }
}

export async function deleteAttachment(id: string): Promise<Image> {
  const image = await prisma.image.delete({
    where: {
      id: id,
    },
  });

  cloudinary.v2.uploader.destroy(image.name as string);

  return image;
}
