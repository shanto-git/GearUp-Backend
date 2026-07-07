import { prisma } from "../../lib/prisma";
import { IGearItem } from "./gear.interface";

const createGearItemIntoDb = async (payload: IGearItem, providerId: string) => {
  return await prisma.gearItem.create({
    data: {
      ...payload,
      providerId,
    },
  });
};

const updateGearItemIntoDb = async (
  id: string,
  payload: IGearItem,
  providerId: string,
) => {
  const gearItem = await prisma.gearItem.findUnique({
    where: {
      id,
    },
  });
  if (!gearItem) {
    throw new Error("Gear item not found");
  }
  if (gearItem.providerId !== providerId) {
    throw new Error("You are not authorized to update this gear item");
  }

  return await prisma.gearItem.update({
    where:{
        id,
    },
    data: payload,
  })
};

export const gearService = {
  createGearItemIntoDb,
  updateGearItemIntoDb,
};
