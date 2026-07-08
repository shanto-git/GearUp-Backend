import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { rentalService } from "./rental.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const createRentalOrder = catchAsync(async(req:Request, res:Response)=>{
    const result = await rentalService.createRentalOrderIntoDb(req.body, req.user?.id as string);
    console.log(req.user);

    sendResponse(res, {
        success:true,
        statusCode:httpStatus.CREATED,
        message:"Rental order created",
        data: result
    })
})

const getMyRental = catchAsync(async(req:Request, res:Response)=>{
    const result = await rentalService.getMyRentalIntoDb(req.user?.id as string)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"User rental orders fetched successfully",
        data:result
    })
})


export const rentalController = {
    createRentalOrder,
    getMyRental
}