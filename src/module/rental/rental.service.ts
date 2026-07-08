import { prisma } from "../../lib/prisma";
import { IRentalOrder } from "./rental.interface";

const createRentalOrderIntoDb = async (
  payload: IRentalOrder,
  customerId: string,
) => {
  console.log("Customer ID:", customerId);
console.log("Payload:", payload);
  const { startDate, endDate, gearItemId } = payload;

  await prisma.user.findFirstOrThrow({
    where: {
      id: customerId,
    },
  });

  const product = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearItemId,
    },
  });

  if (!product.isActive) {
    throw new Error("Gear item is inactive");
  }

  if (product.stock <= 0) {
    throw new Error("Gear item is out of stock");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end <= start) {
    throw new Error("Invalid rental Date");
  }

  const totalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  const totalPrice = totalDays * product.pricePerDay.toNumber();

  const result = await prisma.rentalOrder.create({
    data: {
      gearItem: {
        connect: {
          id: payload.gearItemId,
        },
      },
      customer: {
        connect: {
          id: customerId,
        },
      },
      startDate: start,
      endDate: end,
      totalPrice,
      status: "PENDING",
    },
  });
  return result;
};

const getMyRentalIntoDb = async (customerId:string)=>{
  const result = await prisma.rentalOrder.findMany({
    where:{
       customerId :customerId
    },
    orderBy:{
      createdAt:"desc"
    },
    include:{
      gearItem:true,
    },
    
  });
  return result
}

export const rentalService = {
  createRentalOrderIntoDb,
  getMyRentalIntoDb
};
