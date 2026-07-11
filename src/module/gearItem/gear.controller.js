import { catchAsync } from "../../utils/catchAsync";
import { gearService } from "./gear.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createGearItem = catchAsync(async (req, res) => {
    const result = await gearService.createGearItemIntoDb(req.body, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Gear item created successfully",
        data: result
    });
});
const getAllGearItems = catchAsync(async (req, res) => {
    const result = await gearService.getAllGearItemsFromDb(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear items fetched successfully",
        data: result,
    });
});
const getGearItemById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await gearService.getGearItemByIdIntoDb(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear item details fetched successfully",
        data: result
    });
});
const updateGearItem = catchAsync(async (req, res) => {
    const result = await gearService.updateGearItemIntoDb(req.params.id, req.body, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear item updated successfully",
        data: result
    });
});
const deleteGearItem = catchAsync(async (req, res) => {
    const result = await gearService.deleteGearItemFromDb(req.params.id, req.user?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear item deleted successfully",
        data: result
    });
});
export const gearController = {
    createGearItem,
    updateGearItem,
    deleteGearItem,
    getAllGearItems,
    getGearItemById
};
