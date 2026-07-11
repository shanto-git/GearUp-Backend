import { prisma } from "../../lib/prisma";
import { ICreateReviewPayload } from "./reviews.interface";


const createReviewIntoDb = async (payload: ICreateReviewPayload, customerId: string) => {
  const { gearItemId, rating, comment } = payload;

  const hasValidRental = await prisma.rentalOrder.findFirst({
    where: {
      customerId:customerId,
      gearItemId: gearItemId,
      OrderStatus: "CONFIRMED", 
    },
  });

  if (!hasValidRental) {
    throw new Error(
      "You cannot review this gear item because you haven't rented it yet or the item hasn't been returned."
    );
  }

  const result = await prisma.review.create({
    data: {
      rating,
      comment,
      gearItemId,
      customerId,
    },
  });

  return result;
};

export const reviewService = {
  createReviewIntoDb,
};