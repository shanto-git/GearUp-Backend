import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { reviewService } from "./reviews.service";
import httpStatus from "http-status";
const createReview = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const result = await reviewService.createReviewIntoDb(req.body, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review submitted successfully after rental return",
        data: result,
    });
});
export const reviewController = {
    createReview,
};
