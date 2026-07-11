import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminService } from "./admin.service";
import httpStatus from "http-status";
const getAllUsers = catchAsync(async (req, res) => {
    const result = await adminService.getAllUsersFromDb();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All users retrieved successfully",
        data: result,
    });
});
const updateUserStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.updateUserStatusIntoDb(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User status updated successfully",
        data: result,
    });
});
const getAllGear = catchAsync(async (req, res) => {
    const result = await adminService.getAllGearIntoDb();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All gear listings retrieved successfully by admin",
        data: result,
    });
});
const getAllRentalOrders = catchAsync(async (req, res) => {
    const result = await adminService.getAllRentalOrdersIntoDb();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All rental orders retrieved successfully by admin",
        data: result,
    });
});
export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllGear,
    getAllRentalOrders
};
