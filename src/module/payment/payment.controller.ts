import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.createPaymentIntentInDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment intent created successfully",
    data: result,
  });
});

const stripeWebhookHandler = catchAsync(async (req: Request, res: Response) => {

  await paymentService.handleWebhookEvent(req.body);
  
  res.status(httpStatus.OK).json({ received: true });
});


const getMyPaymentHistory = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id as string;
  const result = await paymentService.getMyPaymentHistoryFromDb(customerId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history fetched successfully",
    data: result,
  });
});

const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const customerId = req.user?.id as string;
  const result = await paymentService.getPaymentDetailsByIdFromDb(id as string, customerId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment details fetched successfully",
    data: result,
  });
});

export const paymentController = {
  createPaymentIntent,
  stripeWebhookHandler,
  getMyPaymentHistory,
  getPaymentDetails,
};