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

const updateMyProfile = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const userId = req.user?.id as string;
    const payload = req.body;
    const updatedProfile = await userService.updateMyProfileIntoDb(userId, payload);

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.OK,
        message: "User profile updated successfully",
        data: updatedProfile
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsersFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All users retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.updateUserStatusIntoDb(id as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User status updated successfully",
    data: result,
  });
});

export const userController = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    updateUserStatus
}