import { Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsersFromDb = async () => {
  const result = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      activeStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserStatusIntoDb = async (
  userId: string,
  payload: { activeStatus: string },
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      activeStatus: payload.activeStatus as Status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      activeStatus: true,
      updatedAt: true,
    },
  });

  return result;
};

const getAllGearIntoDb = async () => {
  const result = await prisma.gearItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      provider: {
        select: {
          id: true,
          name: true,
          email: true,
          activeStatus: true,
        },
      },
      _count: {
        select: {
          rentalOrders: true,
          reviews: true,
        },
      },
    },
  });

  return result;
};

const getAllRentalOrdersIntoDb = async () => {
  const result = await prisma.rentalOrder.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer:{
        select:{
            id:true,
            name:true,
            profile:{
                select:{
                    profilePhoto:true,
                },
            },
        }
      },
      gearItem: {
        select: {
          id: true,
          name: true,
          brand: true,
          pricePerDay: true,
          provider:{
            select:{
                id:true,
                name:true
            }
          }
        },
      },
    },
  });

  return result;
};

export const adminService = {
  getAllUsersFromDb,
  updateUserStatusIntoDb,
  getAllGearIntoDb,
  getAllRentalOrdersIntoDb,
};
