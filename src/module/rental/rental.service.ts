import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IRentalOrder } from "./rental.interface";


const createRentalOrderIntoDb = async (
  payload: IRentalOrder,
  customerId: string,
) => {
  const { startDate, endDate, gearItemId } = payload;

  await prisma.user.findUniqueOrThrow({
    where: { id: customerId },
  });

  const product = await prisma.gearItem.findUniqueOrThrow({
    where: { id: gearItemId },
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

  const pricePerDay = Number(product.pricePerDay);
  const totalPrice = totalDays * pricePerDay;

  const result = await prisma.$transaction(async (tx) => {
    const order = await tx.rentalOrder.create({
      data: {
        startDate: start,
        endDate: end,
        totalPrice,
        OrderStatus: OrderStatus.PLACED, 
        customer: {
          connect: { id: customerId },
        },
        gearItem: {
          connect: { id: gearItemId },
        },
      },
    });

    await tx.gearItem.update({
      where: { id: gearItemId },
      data: {
        stock: {
          decrement: 1,
        },
      },
    });

    return order;
  });

  return result;
};

const getMyRentalIntoDb = async (customerId: string) => {
  const result = await prisma.rentalOrder.findMany({
    where: {
      customerId: customerId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      gearItem: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return result;
};

const getRentalByIdIntoDb = async (rentalId: string, customerId: string) => {
  const result = await prisma.rentalOrder.findFirstOrThrow({
    where: {
      id: rentalId,
      customerId: customerId,
    },
    include: {
      gearItem: true,
    },
  });
  return result;
};

const getProviderIncomingOrderIntoDb = async (providerId: string) => {
  const result = await prisma.rentalOrder.findMany({
    where: {
      gearItem: {
        providerId: providerId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      gearItem: true,
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  if (result.length === 0) {
    throw new Error("No rental orders found for this provider");
  }
  return result;
};

const editRentalStatusIntoDb = async (
  rentalId: string,
  providerId: string,
  payload: { status: string } 
) => {

  const rentalOrder = await prisma.rentalOrder.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      gearItem: true,
    },
  });

  if (!rentalOrder) {
    throw new Error("Rental order not found");
  }

  if (rentalOrder.gearItem.providerId !== providerId) {
    throw new Error("You are not authorized to update this order status");
  }
  const result = await prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },
    data: {
      OrderStatus:payload.status as OrderStatus,
    },
  });

  return result;
};

export const rentalService = {
  createRentalOrderIntoDb,
  getMyRentalIntoDb,
  getRentalByIdIntoDb,
  getProviderIncomingOrderIntoDb,
  editRentalStatusIntoDb
};
