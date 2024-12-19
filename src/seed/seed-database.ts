import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  //1. borrar regristro previos

  await prisma.country.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Insertar Categorias
  const { categories, products, users, countries } = initialData;

  await prisma.country.createMany({
    data: countries,
  });

  await prisma.user.createMany({
    data: users,
  });

  const categoriesData = categories.map((name) => ({
    name,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>);

  console.log(categoriesMap);

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
