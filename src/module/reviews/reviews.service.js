import { prisma } from "../../lib/prisma";
const createReviewIntoDb = async (payload, customerId) => {
    const { gearItemId, rating, comment } = payload;
    const hasValidRental = await prisma.rentalOrder.findFirst({
        where: {
            customerId: customerId,
            gearItemId: gearItemId,
            status: "COMPLETED",
        },
    });
    if (!hasValidRental) {
        throw new Error("You cannot review this gear item because you haven't rented it yet or the item hasn't been returned.");
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
