import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

const getMyProfile = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const profile = await userService.getMyProfileFromDb(req.user?.id as string);

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: profile
    })
})


export const userController = {
    getMyProfile
}