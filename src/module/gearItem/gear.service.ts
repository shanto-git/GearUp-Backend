import { prisma } from "../../lib/prisma";
import { IGearItem } from "./gear.interface";

const createGearItemIntoDb = async (payload: IGearItem, providerId: string)=>{
    return await prisma.gearItem.create({
        data:{
            ...payload,
            providerId
        }
    })
}

export const gearService = {
    createGearItemIntoDb,
}