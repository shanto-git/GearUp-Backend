import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const getMyProfile = catchAsync(async (req, res, next) => {
    const profile = await userService.getMyProfileFromDb(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: profile
    });
});
const updateMyProfile = catchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const updatedProfile = await userService.updateMyProfileIntoDb(userId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile updated successfully",
        data: updatedProfile
    });
});
export const userController = {
    getMyProfile,
    updateMyProfile,
};
