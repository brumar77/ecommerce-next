"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const addressDeleted = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      ok: true,
      message: "Direccion eliminada correctamente de addressDeleted",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo eliminar la direccion del usuario",
    };
  }
};
