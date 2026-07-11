import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { reviewService } from "./reviews.service";
import httpStatus from "http-status";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;

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