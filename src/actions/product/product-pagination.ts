"use server";
import prisma from "@/lib/prisma";
import { Gender as Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1.Obtener los productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      // quiero usar el where solo si, llega el gender sino no
      where: {
        gender: gender,
      },
    });

    // 2.Obtener el total de productos y contar si hay genero
    const totalCount = await prisma.product.count({
      //quiero filtrar con el genero si me lo pasan, sino no
      where: {
        gender: gender,
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
  throw new Error(`No se pudo cargar los productos. error: ${error}`);
  }
};
