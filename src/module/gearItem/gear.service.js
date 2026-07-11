import { prisma } from "../../lib/prisma";
const createGearItemIntoDb = async (payload, providerId) => {
    const { category, ...gearData } = payload;
    return prisma.gearItem.create({
        data: {
            ...gearData,
            provider: {
                connect: {
                    id: providerId,
                },
            },
            category: {
                connectOrCreate: {
                    where: {
                        slug: category.slug,
                    },
                    create: {
                        name: category.name,
                        slug: category.slug,
                        description: category.description,
                    },
                }
            },
        },
        include: {
            category: true,
            provider: true,
        },
    });
};
const getAllGearItemsFromDb = async (query) => {
    const andConditions = [];
    // ১. CategoryId exact match filtering
    if (query.categoryId) {
        andConditions.push({
            categoryId: query.categoryId,
        });
    }
    // ২. Brand partial search (case-insensitive)
    if (query.brand) {
        andConditions.push({
            brand: {
                contains: query.brand,
                mode: "insensitive",
            },
        });
    }
    // ৩. Price range filtering (Maximum Price - lte)
    if (query.price) {
        andConditions.push({
            pricePerDay: {
                lte: Number(query.price),
            },
        });
    }
    // ৪. Active gear items filter (অপশনাল, যদি শুধু একটিভ গিয়ার দেখাতে চান)
    // andConditions.push({
    //     isActive: true
    // })
    const result = await prisma.gearItem.findMany({
        where: {
            AND: andConditions,
        },
        // আপনি চাইলে এখানেও include বা orderBy আপনার প্রোজেক্টের প্রয়োজন অনুযায়ী যুক্ত করতে পারেন
    });
    return result;
};
const getGearItemByIdIntoDb = async (gearId) => {
    const transactionResult = await prisma.$transaction(async (tx) => {
        const gearItem = await tx.gearItem.findFirstOrThrow({
            where: {
                id: gearId
            },
            include: {
                reviews: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    include: {
                        customer: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        reviews: true
                    }
                }
            }
        });
        return gearItem;
    });
    return transactionResult;
};
const updateGearItemIntoDb = async (id, payload, providerId) => {
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
    const { category, ...gearData } = payload;
    return await prisma.gearItem.update({
        where: {
            id,
        },
        data: {
            ...gearData,
            ...(category
                ? {
                    category: {
                        update: {
                            name: category.name,
                            slug: category.slug,
                            description: category.description,
                        },
                    },
                }
                : {}),
        },
        include: {
            category: true,
            provider: true,
        },
    });
};
const deleteGearItemFromDb = async (id, providerId) => {
    const gearItem = await prisma.gearItem.findUnique({
        where: { id },
    });
    if (!gearItem) {
        throw new Error("Gear item not found");
    }
    if (gearItem.providerId !== providerId) {
        throw new Error("You are not authorized to delete this gear item");
    }
    return await prisma.gearItem.delete({
        where: {
            id,
        },
    });
};
export const gearService = {
    createGearItemIntoDb,
    updateGearItemIntoDb,
    deleteGearItemFromDb,
    getAllGearItemsFromDb,
    getGearItemByIdIntoDb
};
