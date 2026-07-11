import { catchAsync } from "../../utils/catchAsync";
import { rentalService } from "./rental.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createRentalOrder = catchAsync(async (req, res) => {
    const result = await rentalService.createRentalOrderIntoDb(req.body, req.user?.id);
    console.log(req.user);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Rental order created",
        data: result,
    });
});
const getMyAllRental = catchAsync(async (req, res) => {
    const result = await rentalService.getMyRentalIntoDb(req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User rental orders fetched successfully",
        data: result,
    });
});
const getMyRental = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await rentalService.getRentalByIdIntoDb(id, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental order details fetched successfully",
        data: result,
    });
});
const getProviderIncomingOrder = catchAsync(async (req, res) => {
    const providerId = req.user?.id;
    const result = await rentalService.getProviderIncomingOrderIntoDb(providerId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Provider incoming orders fetched successfully",
        data: result,
    });
});
const updateRentalStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const providerId = req.user?.id;
    const result = await rentalService.editRentalStatusIntoDb(id, providerId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental order status updated successfully",
        data: result,
    });
});
export const rentalController = {
    createRentalOrder,
    getMyAllRental,
    getMyRental,
    getProviderIncomingOrder,
    updateRentalStatus
};
