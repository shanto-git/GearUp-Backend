import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { gearService } from "./gear.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";


const createGearItem = catchAsync(async(req:Request, res:Response)=>{
    const result = await gearService.createGearItemIntoDb(req.body, req.user?.id as string);

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.CREATED,
        message: "Gear item created successfully",
        data: result
    })
})

const updateGearItem = catchAsync(async(req:Request, res:Response)=>{
    const result = await gearService.updateGearItemIntoDb(req.params.id as string, req.body, req.user?.id as string);

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.OK,
        message: "Gear item updated successfully",
        data: result
    })
})

const deleteGearItem = catchAsync(async(req:Request, res:Response)=>{
    const result = await gearService.deleteGearItemFromDb(req.params.id as string, req.user?.id as string);

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.OK,
        message: "Gear item deleted successfully",
        data: result
    })
})

export const gearController = {
    createGearItem,
    updateGearItem,
    deleteGearItem
}