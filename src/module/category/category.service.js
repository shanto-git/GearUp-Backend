import { prisma } from "../../lib/prisma";
const getAllCategoryIntoDb = async () => {
    const result = await prisma.category.findMany({
        orderBy: {
            name: "desc"
        },
        include: {
            _count: {
                select: {
                    gearItem: true
                }
            }
        }
    });
    return result;
};
export const categoryService = {
    getAllCategoryIntoDb
};
