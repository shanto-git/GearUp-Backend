import { Router } from "express";
import { auth } from "../../middleware/auth";
import { paymentController } from "./payment.controller";


const router = Router()

router.post("/create", auth(), paymentController.createPaymentIntent)
router.post("/confirm", paymentController.stripeWebhookHandler)
router.get("/", auth(), paymentController.getMyPaymentHistory)
router.get("/:id", auth(), paymentController.getPaymentDetails)

export const paymentRoute = router