import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";

const registerUser = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
    const payload = req.body;
    const user = await authService.registerUserIntoDb(payload);

    sendResponse(res, {
        success: true,
        statusCode:httpStatus.CREATED,
        message: "User registered successfully",
        data: {user}
    })
})

const loginUser = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
    const payload = req.body;
    const user = await authService.loginUserIntoDb(payload);

    sendResponse(res, {
        success: true,
        statusCode:httpStatus.OK,
        message: "User logged in successfully",
        data: {user}
    })

})

export const authController = {
    registerUser,
    loginUser,
}