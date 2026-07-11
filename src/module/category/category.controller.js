import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const getAllCategory = catchAsync(async (req, res) => {
    const result = await categoryService.getAllCategoryIntoDb();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories fetched successfully",
        data: result
    });
});
export const categoryController = {
    getAllCategory
};
