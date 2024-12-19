"use server";

import prisma from "@/lib/prisma";
// import { sleep } from "@/utils";

interface Props {
  slug: string;
}
export const getStockBySlug = async ({ slug }: Props): Promise<number> => {
  try {

    // await sleep(3)
    const stock = await prisma.product.findFirst({
      select: {
        inStock: true,
      },
      where: {
        slug: slug,
      },
    });

    return stock?.inStock ?? 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
