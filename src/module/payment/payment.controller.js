import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createPaymentIntent = catchAsync(async (req, res) => {
    const result = await paymentService.createPaymentIntentInDb(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Payment intent created successfully",
        data: result,
    });
});
const stripeWebhookHandler = catchAsync(async (req, res) => {
    await paymentService.handleWebhookEvent(req.body);
    res.status(httpStatus.OK).json({ received: true });
});
const getMyPaymentHistory = catchAsync(async (req, res) => {
    const customerId = req.user?.id;
    const result = await paymentService.getMyPaymentHistoryFromDb(customerId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment history fetched successfully",
        data: result,
    });
});
const getPaymentDetails = catchAsync(async (req, res) => {
    const { id } = req.params;
    const customerId = req.user?.id;
    const result = await paymentService.getPaymentDetailsByIdFromDb(id, customerId);
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
