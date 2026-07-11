import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
const registerUser = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const user = await authService.registerUserIntoDb(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: { user }
    });
});
const loginUser = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.loginUserIntoDb(payload);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: {
            accessToken,
            refreshToken,
        }
    });
});
const refreshToken = catchAsync(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken } = await authService.refreshToken(refreshToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token Refreshed Successfully",
        data: {
            accessToken
        }
    });
});
export const authController = {
    registerUser,
    loginUser,
    refreshToken
};
